"""
Tests for the L-CAS V1.3 Video Stitching Engine.
"""

import os
import tempfile
import pytest
from unittest.mock import patch, MagicMock

from ..video_stitcher_service import (
    VideoStitcherService,
    VideoClip,
    AudioOverlay,
    StitchConfig,
    TransitionType,
    stitch_videos,
)


class TestVideoClip:
    """Tests for VideoClip dataclass."""
    
    def test_video_clip_missing_file_raises(self):
        """VideoClip should raise FileNotFoundError for missing files."""
        with pytest.raises(FileNotFoundError):
            VideoClip(path="/nonexistent/video.mp4")
    
    def test_video_clip_defaults(self, tmp_path):
        """VideoClip should have sensible defaults."""
        video_file = tmp_path / "test.mp4"
        video_file.touch()
        
        clip = VideoClip(path=str(video_file))
        
        assert clip.start_time is None
        assert clip.end_time is None
        assert clip.transition == TransitionType.NONE
        assert clip.transition_duration == 0.5


class TestAudioOverlay:
    """Tests for AudioOverlay dataclass."""
    
    def test_audio_overlay_missing_file_raises(self):
        """AudioOverlay should raise FileNotFoundError for missing files."""
        with pytest.raises(FileNotFoundError):
            AudioOverlay(path="/nonexistent/audio.mp3")
    
    def test_audio_overlay_defaults(self, tmp_path):
        """AudioOverlay should have sensible defaults."""
        audio_file = tmp_path / "test.mp3"
        audio_file.touch()
        
        overlay = AudioOverlay(path=str(audio_file))
        
        assert overlay.volume == 0.3
        assert overlay.start_time == 0.0
        assert overlay.loop is False
        assert overlay.duck_original is True


class TestTransitionType:
    """Tests for TransitionType enum."""
    
    def test_all_transitions_have_values(self):
        """All TransitionType values should be defined."""
        transitions = list(TransitionType)
        assert len(transitions) >= 6
        
        expected = ["crossfade", "slideleft", "slideright", "slideup", "slidedown", "none"]
        values = [t.value for t in transitions]
        
        for exp in expected:
            assert exp in values


class TestVideoStitcherService:
    """Tests for VideoStitcherService."""
    
    @patch("shutil.which")
    def test_init_raises_if_ffmpeg_missing(self, mock_which):
        """Should raise if FFmpeg is not found."""
        mock_which.return_value = None
        
        with pytest.raises(RuntimeError, match="FFmpeg not found"):
            VideoStitcherService()
    
    @patch("shutil.which")
    def test_init_raises_if_ffprobe_missing(self, mock_which):
        """Should raise if FFprobe is not found."""
        def which_side_effect(cmd):
            if cmd == "ffmpeg":
                return "/usr/bin/ffmpeg"
            return None
        
        mock_which.side_effect = which_side_effect
        
        with pytest.raises(RuntimeError, match="FFprobe not found"):
            VideoStitcherService()
    
    @patch("shutil.which", return_value="/usr/bin/ffmpeg")
    def test_get_xfade_transition_mapping(self, mock_which):
        """Should correctly map TransitionType to FFmpeg xfade names."""
        service = VideoStitcherService()
        
        assert service._get_xfade_transition(TransitionType.CROSSFADE) == "fade"
        assert service._get_xfade_transition(TransitionType.SLIDE_LEFT) == "slideleft"
        assert service._get_xfade_transition(TransitionType.SLIDE_RIGHT) == "slideright"
        assert service._get_xfade_transition(TransitionType.SLIDE_UP) == "slideup"
        assert service._get_xfade_transition(TransitionType.SLIDE_DOWN) == "slidedown"
    
    @patch("shutil.which", return_value="/usr/bin/ffmpeg")
    @patch("subprocess.run")
    def test_get_video_info(self, mock_run, mock_which):
        """Should parse ffprobe output correctly."""
        mock_run.return_value = MagicMock(
            stdout='{"format": {"duration": "10.5"}, "streams": [{"codec_type": "video", "width": 1920, "height": 1080, "r_frame_rate": "30/1"}, {"codec_type": "audio"}]}',
            returncode=0,
        )
        
        service = VideoStitcherService()
        info = service.get_video_info("/path/to/video.mp4")
        
        assert info["duration"] == 10.5
        assert info["width"] == 1920
        assert info["height"] == 1080
        assert info["fps"] == 30
        assert info["has_audio"] is True
    
    @patch("shutil.which", return_value="/usr/bin/ffmpeg")
    def test_stitch_requires_clips(self, mock_which):
        """Should raise if no clips provided."""
        service = VideoStitcherService()
        config = StitchConfig(output_path="/output.mp4", clips=[])
        
        with pytest.raises(ValueError, match="At least one video clip"):
            service.stitch(config)


class TestStitchConfig:
    """Tests for StitchConfig dataclass."""
    
    def test_stitch_config_defaults(self):
        """StitchConfig should have sensible defaults."""
        config = StitchConfig(output_path="/output.mp4")
        
        assert config.clips == []
        assert config.audio_overlays == []
        assert config.resolution is None
        assert config.fps is None
        assert config.codec == "libx264"
        assert config.preset == "medium"
        assert config.crf == 23


class TestStitchVideosHelper:
    """Tests for the stitch_videos convenience function."""
    
    @patch("shutil.which", return_value="/usr/bin/ffmpeg")
    def test_stitch_videos_creates_clips(self, mock_which, tmp_path):
        """stitch_videos should create VideoClip objects correctly."""
        # Create fake video files
        v1 = tmp_path / "v1.mp4"
        v2 = tmp_path / "v2.mp4"
        v1.touch()
        v2.touch()
        
        # Patch the stitch method to capture what's passed
        with patch.object(VideoStitcherService, 'stitch') as mock_stitch:
            mock_stitch.return_value = {"success": True}
            
            result = stitch_videos(
                [str(v1), str(v2)],
                str(tmp_path / "output.mp4"),
                transition=TransitionType.SLIDE_LEFT,
                transition_duration=1.0,
            )
            
            assert mock_stitch.called
            config = mock_stitch.call_args[0][0]
            
            assert len(config.clips) == 2
            assert config.clips[0].transition == TransitionType.SLIDE_LEFT
            assert config.clips[1].transition == TransitionType.NONE  # Last clip has no transition
            assert config.clips[0].transition_duration == 1.0
    
    @patch("shutil.which", return_value="/usr/bin/ffmpeg")
    def test_stitch_videos_with_music(self, mock_which, tmp_path):
        """stitch_videos should add audio overlay when music provided."""
        v1 = tmp_path / "v1.mp4"
        music = tmp_path / "music.mp3"
        v1.touch()
        music.touch()
        
        with patch.object(VideoStitcherService, 'stitch') as mock_stitch:
            mock_stitch.return_value = {"success": True}
            
            stitch_videos(
                [str(v1)],
                str(tmp_path / "output.mp4"),
                background_music=str(music),
                music_volume=0.5,
            )
            
            config = mock_stitch.call_args[0][0]
            
            assert len(config.audio_overlays) == 1
            assert config.audio_overlays[0].volume == 0.5
            assert config.audio_overlays[0].loop is True


# Integration tests - only run when FFmpeg is available
@pytest.mark.integration
class TestIntegration:
    """Integration tests requiring FFmpeg."""
    
    @pytest.fixture
    def ffmpeg_available(self):
        """Skip if FFmpeg not available."""
        import shutil
        if not shutil.which("ffmpeg"):
            pytest.skip("FFmpeg not available")
    
    @pytest.fixture
    def sample_video(self, tmp_path, ffmpeg_available):
        """Create a sample video for testing."""
        import subprocess
        
        video_path = tmp_path / "sample.mp4"
        subprocess.run([
            "ffmpeg", "-y",
            "-f", "lavfi", "-i", "testsrc=duration=2:size=640x480:rate=30",
            "-f", "lavfi", "-i", "sine=frequency=440:duration=2",
            "-c:v", "libx264", "-c:a", "aac",
            "-shortest",
            str(video_path)
        ], check=True, capture_output=True)
        
        return video_path
    
    def test_real_video_info(self, sample_video):
        """Test getting info from a real video."""
        service = VideoStitcherService()
        info = service.get_video_info(str(sample_video))
        
        assert info["duration"] >= 1.9  # Approximately 2 seconds
        assert info["width"] == 640
        assert info["height"] == 480
        assert info["has_audio"] is True
    
    def test_real_stitch(self, sample_video, tmp_path):
        """Test stitching real videos."""
        output_path = tmp_path / "stitched.mp4"
        
        config = StitchConfig(
            output_path=str(output_path),
            clips=[
                VideoClip(str(sample_video), transition=TransitionType.CROSSFADE),
                VideoClip(str(sample_video)),
            ],
        )
        
        service = VideoStitcherService()
        result = service.stitch(config)
        
        assert result["success"] is True
        assert os.path.exists(output_path)
        assert result["duration"] >= 3.5  # 2 + 2 - 0.5 transition
