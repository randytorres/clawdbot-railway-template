"""
L-CAS V1.3 Video Stitching Engine

Concatenates video clips using FFmpeg with support for:
- Crossfade transitions
- Slide transitions (left, right, up, down)
- Audio overlay (background music, voiceover)

Author: Friday (Dev)
Version: 1.3.0
"""

from __future__ import annotations

import logging
import os
import shutil
import subprocess
import tempfile
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)


class TransitionType(Enum):
    """Supported transition types between clips."""
    NONE = "none"
    CROSSFADE = "crossfade"
    SLIDE_LEFT = "slideleft"
    SLIDE_RIGHT = "slideright"
    SLIDE_UP = "slideup"
    SLIDE_DOWN = "slidedown"
    FADE_BLACK = "fade"
    WIPE_LEFT = "wipeleft"
    WIPE_RIGHT = "wiperight"


@dataclass
class VideoClip:
    """Represents a single video clip in the stitch sequence."""
    path: str
    start_time: Optional[float] = None  # Trim start (seconds)
    end_time: Optional[float] = None    # Trim end (seconds)
    transition: TransitionType = TransitionType.NONE
    transition_duration: float = 0.5    # Transition duration in seconds
    
    def __post_init__(self):
        if not os.path.exists(self.path):
            raise FileNotFoundError(f"Video clip not found: {self.path}")


@dataclass
class AudioOverlay:
    """Audio track to overlay on the final video."""
    path: str
    volume: float = 0.3           # 0.0 to 1.0
    start_time: float = 0.0       # When to start the audio
    fade_in: float = 0.0          # Fade in duration
    fade_out: float = 0.0         # Fade out duration
    loop: bool = False            # Loop audio to match video length
    duck_original: bool = True    # Lower original audio when overlay plays
    duck_amount: float = 0.2      # How much to lower original (0.0 to 1.0)
    
    def __post_init__(self):
        if not os.path.exists(self.path):
            raise FileNotFoundError(f"Audio file not found: {self.path}")


@dataclass
class StitchConfig:
    """Configuration for the video stitching operation."""
    output_path: str
    clips: list[VideoClip] = field(default_factory=list)
    audio_overlays: list[AudioOverlay] = field(default_factory=list)
    
    # Output settings
    resolution: Optional[tuple[int, int]] = None  # (width, height), None = use first clip
    fps: Optional[float] = None                   # None = use first clip
    codec: str = "libx264"
    audio_codec: str = "aac"
    preset: str = "medium"                        # ultrafast, fast, medium, slow, veryslow
    crf: int = 23                                 # Quality (0-51, lower = better)
    
    # Normalize all clips to same format before stitching
    normalize: bool = True


class VideoStitcherService:
    """
    L-CAS Video Stitching Engine.
    
    Concatenates multiple video clips with optional transitions and audio overlays.
    Uses FFmpeg via subprocess for maximum compatibility and control.
    
    Example:
        stitcher = VideoStitcherService()
        
        config = StitchConfig(
            output_path="output.mp4",
            clips=[
                VideoClip("intro.mp4", transition=TransitionType.CROSSFADE),
                VideoClip("main.mp4", transition=TransitionType.SLIDE_LEFT),
                VideoClip("outro.mp4"),
            ],
            audio_overlays=[
                AudioOverlay("background_music.mp3", volume=0.2, loop=True),
            ],
        )
        
        result = stitcher.stitch(config)
    """
    
    def __init__(self, ffmpeg_path: str = "ffmpeg", ffprobe_path: str = "ffprobe"):
        self.ffmpeg_path = ffmpeg_path
        self.ffprobe_path = ffprobe_path
        self._validate_ffmpeg()
    
    def _validate_ffmpeg(self) -> None:
        """Ensure FFmpeg is available."""
        if not shutil.which(self.ffmpeg_path):
            raise RuntimeError(
                f"FFmpeg not found at '{self.ffmpeg_path}'. "
                "Please install FFmpeg or provide the correct path."
            )
        if not shutil.which(self.ffprobe_path):
            raise RuntimeError(
                f"FFprobe not found at '{self.ffprobe_path}'. "
                "Please install FFmpeg or provide the correct path."
            )
    
    def get_video_info(self, path: str) -> dict:
        """Get video metadata using ffprobe."""
        cmd = [
            self.ffprobe_path,
            "-v", "quiet",
            "-print_format", "json",
            "-show_format",
            "-show_streams",
            path
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        import json
        data = json.loads(result.stdout)
        
        video_stream = next(
            (s for s in data.get("streams", []) if s["codec_type"] == "video"),
            None
        )
        audio_stream = next(
            (s for s in data.get("streams", []) if s["codec_type"] == "audio"),
            None
        )
        
        info = {
            "duration": float(data.get("format", {}).get("duration", 0)),
            "width": int(video_stream.get("width", 0)) if video_stream else 0,
            "height": int(video_stream.get("height", 0)) if video_stream else 0,
            "fps": eval(video_stream.get("r_frame_rate", "30/1")) if video_stream else 30,
            "has_audio": audio_stream is not None,
        }
        
        return info
    
    def get_total_duration(self, clips: list[VideoClip]) -> float:
        """Calculate total duration of all clips minus transition overlaps."""
        total = 0.0
        for i, clip in enumerate(clips):
            info = self.get_video_info(clip.path)
            duration = info["duration"]
            
            # Apply trim
            if clip.start_time:
                duration -= clip.start_time
            if clip.end_time:
                duration = clip.end_time - (clip.start_time or 0)
            
            total += duration
            
            # Subtract transition overlap (except for last clip)
            if i < len(clips) - 1 and clip.transition != TransitionType.NONE:
                total -= clip.transition_duration
        
        return total
    
    def _normalize_clip(
        self, 
        clip: VideoClip, 
        output_path: str,
        target_width: int,
        target_height: int,
        target_fps: float,
    ) -> str:
        """Normalize a clip to target resolution and fps."""
        cmd = [
            self.ffmpeg_path,
            "-y",  # Overwrite
            "-i", clip.path,
        ]
        
        # Add trim filters if specified
        if clip.start_time is not None:
            cmd.extend(["-ss", str(clip.start_time)])
        if clip.end_time is not None:
            duration = clip.end_time - (clip.start_time or 0)
            cmd.extend(["-t", str(duration)])
        
        # Video filter: scale and pad to target resolution, set fps
        vf = (
            f"scale={target_width}:{target_height}:force_original_aspect_ratio=decrease,"
            f"pad={target_width}:{target_height}:(ow-iw)/2:(oh-ih)/2:black,"
            f"fps={target_fps},"
            f"format=yuv420p"
        )
        
        cmd.extend([
            "-vf", vf,
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "18",
            "-c:a", "aac",
            "-ar", "48000",
            "-ac", "2",
            output_path
        ])
        
        logger.info(f"Normalizing clip: {clip.path}")
        subprocess.run(cmd, check=True, capture_output=True)
        
        return output_path
    
    def _build_transition_filter(
        self,
        clip_count: int,
        clips: list[VideoClip],
        total_durations: list[float],
    ) -> str:
        """Build FFmpeg complex filter for transitions between clips."""
        if clip_count == 1:
            return "[0:v]copy[outv];[0:a]acopy[outa]"
        
        filters = []
        video_streams = []
        audio_streams = []
        
        # Build transition chain
        current_offset = 0.0
        
        for i in range(clip_count):
            video_streams.append(f"[{i}:v]")
            audio_streams.append(f"[{i}:a]")
        
        # For crossfade/slide transitions, use xfade filter
        if any(c.transition != TransitionType.NONE for c in clips[:-1]):
            # Chain xfade filters
            prev_label = "0:v"
            offset = total_durations[0]
            
            for i in range(1, clip_count):
                clip = clips[i - 1]  # Transition is on the preceding clip
                
                if clip.transition != TransitionType.NONE:
                    # Adjust offset for transition overlap
                    trans_offset = offset - clip.transition_duration
                    
                    transition_name = self._get_xfade_transition(clip.transition)
                    out_label = f"v{i}" if i < clip_count - 1 else "outv"
                    
                    filters.append(
                        f"[{prev_label}][{i}:v]xfade=transition={transition_name}:"
                        f"duration={clip.transition_duration}:offset={trans_offset}[{out_label}]"
                    )
                    
                    prev_label = out_label
                    offset = trans_offset + total_durations[i]
                else:
                    # No transition, just concat
                    if i == 1:
                        filters.append(f"[0:v][1:v]concat=n=2:v=1:a=0[v{i}]")
                        prev_label = f"v{i}"
                    else:
                        out_label = f"v{i}" if i < clip_count - 1 else "outv"
                        filters.append(f"[{prev_label}][{i}:v]concat=n=2:v=1:a=0[{out_label}]")
                        prev_label = out_label
                    
                    offset += total_durations[i]
            
            # Audio: crossfade audio streams
            prev_audio = "0:a"
            audio_offset = total_durations[0]
            
            for i in range(1, clip_count):
                clip = clips[i - 1]
                
                if clip.transition != TransitionType.NONE:
                    trans_offset = audio_offset - clip.transition_duration
                    out_label = f"a{i}" if i < clip_count - 1 else "outa"
                    
                    filters.append(
                        f"[{prev_audio}][{i}:a]acrossfade=d={clip.transition_duration}:"
                        f"c1=tri:c2=tri[{out_label}]"
                    )
                    
                    prev_audio = out_label
                    audio_offset = trans_offset + total_durations[i]
                else:
                    out_label = f"a{i}" if i < clip_count - 1 else "outa"
                    filters.append(f"[{prev_audio}][{i}:a]concat=n=2:v=0:a=1[{out_label}]")
                    prev_audio = out_label
                    audio_offset += total_durations[i]
        else:
            # Simple concat, no transitions
            video_inputs = "".join(video_streams)
            audio_inputs = "".join(audio_streams)
            
            filters.append(
                f"{video_inputs}concat=n={clip_count}:v=1:a=0[outv]"
            )
            filters.append(
                f"{audio_inputs}concat=n={clip_count}:v=0:a=1[outa]"
            )
        
        return ";".join(filters)
    
    def _get_xfade_transition(self, transition: TransitionType) -> str:
        """Map TransitionType to FFmpeg xfade transition name."""
        mapping = {
            TransitionType.CROSSFADE: "fade",
            TransitionType.SLIDE_LEFT: "slideleft",
            TransitionType.SLIDE_RIGHT: "slideright",
            TransitionType.SLIDE_UP: "slideup",
            TransitionType.SLIDE_DOWN: "slidedown",
            TransitionType.FADE_BLACK: "fadeblack",
            TransitionType.WIPE_LEFT: "wipeleft",
            TransitionType.WIPE_RIGHT: "wiperight",
        }
        return mapping.get(transition, "fade")
    
    def _apply_audio_overlays(
        self,
        video_path: str,
        output_path: str,
        overlays: list[AudioOverlay],
        video_duration: float,
        config: StitchConfig,
    ) -> None:
        """Apply audio overlays to the video."""
        if not overlays:
            shutil.copy(video_path, output_path)
            return
        
        cmd = [
            self.ffmpeg_path,
            "-y",
            "-i", video_path,  # Input 0: video with original audio
        ]
        
        # Add audio overlay inputs
        for overlay in overlays:
            cmd.extend(["-i", overlay.path])
        
        # Build complex filter for audio mixing
        filter_parts = []
        audio_streams = ["[0:a]"]  # Original audio
        
        for i, overlay in enumerate(overlays, start=1):
            stream_label = f"a{i}"
            audio_filter = f"[{i}:a]"
            
            # Volume adjustment
            audio_filter_chain = []
            
            # Loop if needed
            if overlay.loop:
                audio_filter_chain.append(f"aloop=loop=-1:size=2e+09")
            
            # Trim to video duration
            audio_filter_chain.append(f"atrim=0:{video_duration}")
            
            # Delay to start time
            if overlay.start_time > 0:
                delay_ms = int(overlay.start_time * 1000)
                audio_filter_chain.append(f"adelay={delay_ms}|{delay_ms}")
            
            # Fade in/out
            if overlay.fade_in > 0:
                audio_filter_chain.append(f"afade=t=in:st=0:d={overlay.fade_in}")
            if overlay.fade_out > 0:
                fade_start = video_duration - overlay.fade_out
                audio_filter_chain.append(f"afade=t=out:st={fade_start}:d={overlay.fade_out}")
            
            # Volume
            audio_filter_chain.append(f"volume={overlay.volume}")
            
            filter_str = f"[{i}:a]" + ",".join(audio_filter_chain) + f"[{stream_label}]"
            filter_parts.append(filter_str)
            audio_streams.append(f"[{stream_label}]")
        
        # Mix all audio streams
        if overlays[0].duck_original if overlays else False:
            # Apply ducking to original audio
            duck_vol = overlays[0].duck_amount
            filter_parts.insert(0, f"[0:a]volume={duck_vol}[a0ducked]")
            audio_streams[0] = "[a0ducked]"
        
        mix_inputs = "".join(audio_streams)
        filter_parts.append(
            f"{mix_inputs}amix=inputs={len(audio_streams)}:duration=first:dropout_transition=2[aout]"
        )
        
        complex_filter = ";".join(filter_parts)
        
        cmd.extend([
            "-filter_complex", complex_filter,
            "-map", "0:v",
            "-map", "[aout]",
            "-c:v", "copy",
            "-c:a", config.audio_codec,
            "-shortest",
            output_path
        ])
        
        logger.info("Applying audio overlays")
        subprocess.run(cmd, check=True, capture_output=True)
    
    def stitch(self, config: StitchConfig) -> dict:
        """
        Stitch video clips together according to the configuration.
        
        Args:
            config: StitchConfig with clips, overlays, and output settings.
            
        Returns:
            dict with 'success', 'output_path', 'duration', and any 'errors'.
        """
        if not config.clips:
            raise ValueError("At least one video clip is required")
        
        result = {
            "success": False,
            "output_path": config.output_path,
            "duration": 0.0,
            "errors": [],
        }
        
        try:
            with tempfile.TemporaryDirectory(prefix="lcas_stitch_") as temp_dir:
                temp_path = Path(temp_dir)
                
                # Get target resolution and fps from first clip or config
                first_info = self.get_video_info(config.clips[0].path)
                target_width = config.resolution[0] if config.resolution else first_info["width"]
                target_height = config.resolution[1] if config.resolution else first_info["height"]
                target_fps = config.fps or first_info["fps"]
                
                logger.info(f"Target: {target_width}x{target_height} @ {target_fps}fps")
                
                # Normalize clips if needed
                normalized_clips = []
                clip_durations = []
                
                for i, clip in enumerate(config.clips):
                    if config.normalize:
                        norm_path = str(temp_path / f"clip_{i:03d}.mp4")
                        self._normalize_clip(
                            clip, norm_path, target_width, target_height, target_fps
                        )
                        normalized_clips.append(norm_path)
                    else:
                        normalized_clips.append(clip.path)
                    
                    # Get duration of normalized clip
                    info = self.get_video_info(normalized_clips[-1])
                    clip_durations.append(info["duration"])
                
                # Build the stitch command
                if len(normalized_clips) == 1:
                    # Single clip, just copy
                    intermediate_output = str(temp_path / "stitched.mp4")
                    shutil.copy(normalized_clips[0], intermediate_output)
                else:
                    # Multiple clips with transitions
                    intermediate_output = str(temp_path / "stitched.mp4")
                    
                    # Build FFmpeg command with complex filter
                    cmd = [self.ffmpeg_path, "-y"]
                    
                    for clip_path in normalized_clips:
                        cmd.extend(["-i", clip_path])
                    
                    complex_filter = self._build_transition_filter(
                        len(normalized_clips),
                        config.clips,
                        clip_durations,
                    )
                    
                    cmd.extend([
                        "-filter_complex", complex_filter,
                        "-map", "[outv]",
                        "-map", "[outa]",
                        "-c:v", config.codec,
                        "-preset", config.preset,
                        "-crf", str(config.crf),
                        "-c:a", config.audio_codec,
                        intermediate_output
                    ])
                    
                    logger.info("Stitching clips with transitions")
                    proc = subprocess.run(cmd, capture_output=True, text=True)
                    
                    if proc.returncode != 0:
                        logger.error(f"FFmpeg error: {proc.stderr}")
                        raise subprocess.CalledProcessError(
                            proc.returncode, cmd, proc.stdout, proc.stderr
                        )
                
                # Apply audio overlays if any
                if config.audio_overlays:
                    final_output = str(temp_path / "final.mp4")
                    video_duration = self.get_video_info(intermediate_output)["duration"]
                    
                    self._apply_audio_overlays(
                        intermediate_output,
                        final_output,
                        config.audio_overlays,
                        video_duration,
                        config,
                    )
                else:
                    final_output = intermediate_output
                
                # Move to final destination
                os.makedirs(os.path.dirname(os.path.abspath(config.output_path)), exist_ok=True)
                shutil.move(final_output, config.output_path)
                
                # Get final info
                final_info = self.get_video_info(config.output_path)
                
                result["success"] = True
                result["duration"] = final_info["duration"]
                result["resolution"] = f"{final_info['width']}x{final_info['height']}"
                result["fps"] = final_info["fps"]
                
                logger.info(
                    f"Video stitched successfully: {config.output_path} "
                    f"({result['duration']:.1f}s, {result['resolution']})"
                )
                
        except subprocess.CalledProcessError as e:
            result["errors"].append(f"FFmpeg error: {e.stderr if e.stderr else str(e)}")
            logger.error(f"Stitch failed: {result['errors'][-1]}")
        except Exception as e:
            result["errors"].append(str(e))
            logger.error(f"Stitch failed: {e}")
        
        return result
    
    def create_slideshow(
        self,
        images: list[str],
        output_path: str,
        duration_per_image: float = 3.0,
        transition: TransitionType = TransitionType.CROSSFADE,
        transition_duration: float = 0.5,
        audio_path: Optional[str] = None,
        fps: int = 30,
    ) -> dict:
        """
        Create a video slideshow from images.
        
        Args:
            images: List of image file paths.
            output_path: Output video path.
            duration_per_image: How long each image displays.
            transition: Transition between images.
            transition_duration: Transition duration.
            audio_path: Optional background audio.
            fps: Output frame rate.
            
        Returns:
            dict with result info.
        """
        if not images:
            raise ValueError("At least one image is required")
        
        result = {
            "success": False,
            "output_path": output_path,
            "duration": 0.0,
            "errors": [],
        }
        
        try:
            with tempfile.TemporaryDirectory(prefix="lcas_slideshow_") as temp_dir:
                temp_path = Path(temp_dir)
                
                # Convert images to video clips
                video_clips = []
                
                for i, img_path in enumerate(images):
                    clip_path = str(temp_path / f"img_{i:03d}.mp4")
                    
                    cmd = [
                        self.ffmpeg_path,
                        "-y",
                        "-loop", "1",
                        "-i", img_path,
                        "-c:v", "libx264",
                        "-t", str(duration_per_image),
                        "-pix_fmt", "yuv420p",
                        "-vf", f"scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black,fps={fps}",
                        "-an",  # No audio for image clips
                        clip_path
                    ]
                    
                    subprocess.run(cmd, check=True, capture_output=True)
                    video_clips.append(clip_path)
                
                # Create VideoClip objects with transitions
                clips = []
                for i, clip_path in enumerate(video_clips):
                    trans = transition if i < len(video_clips) - 1 else TransitionType.NONE
                    clips.append(VideoClip(
                        path=clip_path,
                        transition=trans,
                        transition_duration=transition_duration,
                    ))
                
                # Build stitch config
                overlays = []
                if audio_path:
                    overlays.append(AudioOverlay(
                        path=audio_path,
                        volume=0.5,
                        loop=True,
                        fade_out=2.0,
                    ))
                
                config = StitchConfig(
                    output_path=output_path,
                    clips=clips,
                    audio_overlays=overlays,
                    normalize=False,  # Already normalized
                )
                
                result = self.stitch(config)
                
        except Exception as e:
            result["errors"].append(str(e))
            logger.error(f"Slideshow creation failed: {e}")
        
        return result


# Convenience function for simple stitching
def stitch_videos(
    input_paths: list[str],
    output_path: str,
    transition: TransitionType = TransitionType.CROSSFADE,
    transition_duration: float = 0.5,
    background_music: Optional[str] = None,
    music_volume: float = 0.2,
) -> dict:
    """
    Simple function to stitch videos together.
    
    Args:
        input_paths: List of video file paths.
        output_path: Output video path.
        transition: Transition type between clips.
        transition_duration: Duration of transitions.
        background_music: Optional background music path.
        music_volume: Volume of background music (0.0-1.0).
        
    Returns:
        dict with result info.
    """
    clips = []
    for i, path in enumerate(input_paths):
        trans = transition if i < len(input_paths) - 1 else TransitionType.NONE
        clips.append(VideoClip(
            path=path,
            transition=trans,
            transition_duration=transition_duration,
        ))
    
    overlays = []
    if background_music:
        overlays.append(AudioOverlay(
            path=background_music,
            volume=music_volume,
            loop=True,
            fade_out=2.0,
            duck_original=True,
        ))
    
    config = StitchConfig(
        output_path=output_path,
        clips=clips,
        audio_overlays=overlays,
    )
    
    stitcher = VideoStitcherService()
    return stitcher.stitch(config)


if __name__ == "__main__":
    # Example usage
    import sys
    
    logging.basicConfig(level=logging.INFO)
    
    if len(sys.argv) < 3:
        print("Usage: python video_stitcher_service.py output.mp4 input1.mp4 input2.mp4 ...")
        sys.exit(1)
    
    output = sys.argv[1]
    inputs = sys.argv[2:]
    
    result = stitch_videos(inputs, output)
    
    if result["success"]:
        print(f"✓ Created {output} ({result['duration']:.1f}s)")
    else:
        print(f"✗ Failed: {result['errors']}")
        sys.exit(1)
