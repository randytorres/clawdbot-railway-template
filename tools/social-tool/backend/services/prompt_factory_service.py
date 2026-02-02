"""
Prompt Factory V1.2 - Combinatorial Prompt Generation Service

Generates 100+ prompts per theme through combinatorial expansion,
injects brand style, and outputs structured JSON.

Authors: Loki (Writer) + Friday (Dev)
"""

import json
import itertools
import random
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field, asdict
from datetime import datetime
from enum import Enum


class ContentTone(Enum):
    """Available content tones for prompt generation."""
    PROFESSIONAL = "professional"
    CASUAL = "casual"
    WITTY = "witty"
    INSPIRATIONAL = "inspirational"
    EDUCATIONAL = "educational"
    PROVOCATIVE = "provocative"
    EMPATHETIC = "empathetic"
    AUTHORITATIVE = "authoritative"


class ContentFormat(Enum):
    """Available content formats."""
    THREAD = "thread"
    SINGLE_POST = "single_post"
    CAROUSEL = "carousel"
    STORY = "story"
    LONG_FORM = "long_form"
    QUOTE = "quote"
    LIST = "list"
    QUESTION = "question"


class Platform(Enum):
    """Supported social platforms."""
    TWITTER = "twitter"
    LINKEDIN = "linkedin"
    INSTAGRAM = "instagram"
    TIKTOK = "tiktok"
    THREADS = "threads"
    BLUESKY = "bluesky"


@dataclass
class BrandStyle:
    """Brand style configuration for prompt injection."""
    name: str
    voice: str = "professional yet approachable"
    values: List[str] = field(default_factory=lambda: ["innovation", "authenticity", "impact"])
    forbidden_words: List[str] = field(default_factory=list)
    preferred_phrases: List[str] = field(default_factory=list)
    emoji_style: str = "minimal"  # minimal, moderate, heavy
    hashtag_strategy: str = "strategic"  # none, minimal, strategic, heavy
    cta_style: str = "soft"  # none, soft, direct, urgent


@dataclass
class PromptTemplate:
    """A single generated prompt with metadata."""
    id: str
    theme: str
    prompt_text: str
    tone: str
    format: str
    platform: str
    brand_injected: bool
    hooks: List[str]
    angles: List[str]
    variables: Dict[str, str]
    estimated_engagement: str  # low, medium, high
    created_at: str


@dataclass
class PromptFactoryOutput:
    """Complete output from the prompt factory."""
    theme: str
    brand: str
    total_prompts: int
    prompts: List[PromptTemplate]
    generation_metadata: Dict[str, Any]


class PromptFactoryService:
    """
    V1.2 Prompt Factory - Combinatorial Prompt Generation
    
    Generates 100+ unique prompts per theme by combining:
    - Multiple hooks (attention grabbers)
    - Various angles (perspectives on the topic)
    - Different tones
    - Multiple formats
    - Platform-specific adaptations
    - Brand style injection
    """
    
    # Hook templates - attention grabbers
    HOOKS = {
        "contrarian": [
            "Everyone says {topic} is {common_belief}. They're wrong.",
            "The {topic} advice you've heard is probably backwards.",
            "Unpopular opinion about {topic}:",
            "What nobody tells you about {topic}:",
            "I stopped believing the {topic} myth and here's what happened:",
        ],
        "story": [
            "3 years ago, I knew nothing about {topic}. Today...",
            "The {topic} lesson I learned the hard way:",
            "I failed at {topic} for years until I discovered this:",
            "My journey with {topic} started with a disaster.",
            "The moment {topic} finally clicked for me:",
        ],
        "curiosity": [
            "Why do most people get {topic} completely wrong?",
            "What if everything you knew about {topic} was outdated?",
            "The hidden truth about {topic} that experts don't share:",
            "There's a reason {topic} feels so hard. It's not what you think.",
            "The {topic} secret hiding in plain sight:",
        ],
        "value_promise": [
            "How to master {topic} in 30 days (real framework):",
            "The {topic} playbook that changed everything:",
            "{number} principles of {topic} that actually work:",
            "A simple {topic} system anyone can use:",
            "The only {topic} guide you'll ever need:",
        ],
        "social_proof": [
            "After helping {number}+ people with {topic}, here's what I learned:",
            "The {topic} pattern I see in every successful person:",
            "What top performers do differently with {topic}:",
            "Studied {number} case studies on {topic}. Key insight:",
            "The {topic} trait shared by every expert I've met:",
        ],
        "urgency": [
            "Stop making these {topic} mistakes immediately:",
            "If you're struggling with {topic}, read this now:",
            "The {topic} shift happening right now that most are missing:",
            "You're running out of time to fix your {topic} approach:",
            "{topic} is changing fast. Here's how to adapt:",
        ],
        "relatable": [
            "Struggling with {topic}? You're not alone.",
            "The {topic} frustration nobody talks about:",
            "Why does {topic} feel harder than it should?",
            "If {topic} makes you anxious, this is for you:",
            "The {topic} imposter syndrome is real. Here's how to beat it:",
        ],
    }
    
    # Angle templates - different perspectives
    ANGLES = {
        "practical": [
            "Here's a step-by-step breakdown:",
            "Actionable framework below:",
            "Here's exactly what to do:",
            "Copy this system:",
            "The practical approach:",
        ],
        "philosophical": [
            "But first, let's reframe how we think about this:",
            "The mindset shift that changes everything:",
            "It's less about tactics, more about principles:",
            "Before the how, understand the why:",
            "The deeper truth behind this:",
        ],
        "data_driven": [
            "The data reveals something surprising:",
            "Research shows a counterintuitive pattern:",
            "Numbers don't lie. Here's what they say:",
            "After analyzing the data:",
            "The statistics tell an interesting story:",
        ],
        "experience": [
            "In my experience working with hundreds of people:",
            "After years in this field:",
            "What I've seen firsthand:",
            "The patterns I've observed:",
            "Learning this cost me years. Sharing it takes minutes:",
        ],
        "future": [
            "Where this is heading:",
            "The future of this looks different:",
            "In 5 years, this will be obvious:",
            "Early adopters see it already:",
            "The trend nobody's talking about:",
        ],
    }
    
    # Body templates for different formats
    BODY_TEMPLATES = {
        ContentFormat.THREAD: [
            "🧵 {hook}\n\n{angle}\n\n1/ {point_1}\n\n2/ {point_2}\n\n3/ {point_3}\n\n{cta}",
            "{hook}\n\n{angle}\n\nHere's the breakdown:\n\n• {point_1}\n• {point_2}\n• {point_3}\n\n{cta}",
        ],
        ContentFormat.SINGLE_POST: [
            "{hook}\n\n{angle}\n\n{key_insight}\n\n{cta}",
            "{hook}\n\n{key_insight}\n\n{angle}\n\n{cta}",
        ],
        ContentFormat.LIST: [
            "{hook}\n\n{number} key points:\n\n1. {point_1}\n2. {point_2}\n3. {point_3}\n4. {point_4}\n5. {point_5}\n\n{cta}",
        ],
        ContentFormat.QUESTION: [
            "{hook}\n\nDrop your answer below 👇",
            "{hook}\n\nWhat's your take? {cta}",
        ],
        ContentFormat.QUOTE: [
            '"{quote}"\n\n{angle}\n\n{cta}',
        ],
    }
    
    # Platform-specific adjustments
    PLATFORM_CONFIGS = {
        Platform.TWITTER: {
            "max_length": 280,
            "thread_support": True,
            "emoji_weight": 0.7,
            "hashtag_count": 2,
        },
        Platform.LINKEDIN: {
            "max_length": 3000,
            "thread_support": False,
            "emoji_weight": 0.3,
            "hashtag_count": 3,
        },
        Platform.INSTAGRAM: {
            "max_length": 2200,
            "thread_support": False,
            "emoji_weight": 1.0,
            "hashtag_count": 10,
        },
        Platform.THREADS: {
            "max_length": 500,
            "thread_support": True,
            "emoji_weight": 0.5,
            "hashtag_count": 2,
        },
        Platform.BLUESKY: {
            "max_length": 300,
            "thread_support": True,
            "emoji_weight": 0.5,
            "hashtag_count": 2,
        },
    }
    
    # Engagement boosters
    CTAS = {
        "soft": [
            "Thoughts?",
            "What resonates?",
            "Save this for later.",
            "Hope this helps.",
            "Let me know what you think.",
        ],
        "direct": [
            "Follow for more insights like this.",
            "Repost if this helped you.",
            "Drop a 🔥 if you agree.",
            "Share with someone who needs this.",
            "Comment your biggest takeaway.",
        ],
        "urgent": [
            "Don't scroll past this.",
            "Bookmark NOW before you forget.",
            "This won't stay up forever.",
            "Take action today.",
            "Your future self will thank you.",
        ],
    }
    
    def __init__(self, brand_style: Optional[BrandStyle] = None):
        """Initialize the prompt factory with optional brand configuration."""
        self.brand_style = brand_style or BrandStyle(name="default")
        self._prompt_counter = 0
    
    def _generate_id(self) -> str:
        """Generate unique prompt ID."""
        self._prompt_counter += 1
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        return f"prompt_{timestamp}_{self._prompt_counter:04d}"
    
    def _inject_brand_style(self, prompt_text: str) -> str:
        """Inject brand style into the prompt text."""
        result = prompt_text
        
        # Add brand voice instruction
        result = f"[Voice: {self.brand_style.voice}]\n\n{result}"
        
        # Add preferred phrases hint
        if self.brand_style.preferred_phrases:
            phrases = ", ".join(self.brand_style.preferred_phrases[:3])
            result += f"\n\n[Incorporate phrases like: {phrases}]"
        
        # Add forbidden words warning
        if self.brand_style.forbidden_words:
            forbidden = ", ".join(self.brand_style.forbidden_words)
            result += f"\n\n[Avoid: {forbidden}]"
        
        # Add emoji guidance
        result += f"\n\n[Emoji style: {self.brand_style.emoji_style}]"
        
        return result
    
    def _select_hooks(self, theme: str, count: int = 3) -> List[str]:
        """Select and format hooks for a theme."""
        all_hooks = []
        for category, hooks in self.HOOKS.items():
            for hook in hooks:
                formatted = hook.format(
                    topic=theme,
                    common_belief="the standard approach",
                    number=random.choice(["50", "100", "500", "1000"]),
                )
                all_hooks.append(formatted)
        
        random.shuffle(all_hooks)
        return all_hooks[:count]
    
    def _select_angles(self, count: int = 2) -> List[str]:
        """Select angles for perspective variety."""
        all_angles = []
        for category, angles in self.ANGLES.items():
            all_angles.extend(angles)
        
        random.shuffle(all_angles)
        return all_angles[:count]
    
    def _estimate_engagement(self, hook_type: str, format_type: str) -> str:
        """Estimate potential engagement level."""
        high_engagement = ["contrarian", "story", "curiosity"]
        high_formats = [ContentFormat.THREAD, ContentFormat.LIST]
        
        score = 0
        if hook_type in high_engagement:
            score += 2
        if format_type in [f.value for f in high_formats]:
            score += 1
        
        if score >= 3:
            return "high"
        elif score >= 1:
            return "medium"
        return "low"
    
    def generate_prompts(
        self,
        theme: str,
        min_prompts: int = 100,
        tones: Optional[List[ContentTone]] = None,
        formats: Optional[List[ContentFormat]] = None,
        platforms: Optional[List[Platform]] = None,
    ) -> PromptFactoryOutput:
        """
        Generate prompts through combinatorial expansion.
        
        Args:
            theme: The main topic/theme for prompts
            min_prompts: Minimum number of prompts to generate (default 100)
            tones: List of tones to use (default: all)
            formats: List of formats to use (default: all)
            platforms: List of platforms to target (default: all)
        
        Returns:
            PromptFactoryOutput with all generated prompts in JSON-ready format
        """
        # Default to all options if not specified
        tones = tones or list(ContentTone)
        formats = formats or list(ContentFormat)
        platforms = platforms or list(Platform)
        
        prompts: List[PromptTemplate] = []
        
        # Get all hook categories
        hook_categories = list(self.HOOKS.keys())
        angle_categories = list(self.ANGLES.keys())
        cta_styles = list(self.CTAS.keys())
        
        # Create combinations
        combinations = list(itertools.product(
            hook_categories,
            angle_categories,
            tones,
            formats,
            platforms,
            cta_styles,
        ))
        
        # Shuffle for variety
        random.shuffle(combinations)
        
        # Generate prompts until we hit minimum
        for combo in combinations:
            if len(prompts) >= min_prompts:
                break
            
            hook_cat, angle_cat, tone, fmt, platform, cta_style = combo
            
            # Skip incompatible combinations
            if fmt == ContentFormat.THREAD and not self.PLATFORM_CONFIGS.get(platform, {}).get("thread_support", False):
                continue
            
            # Select random hook and angle from categories
            hook = random.choice(self.HOOKS[hook_cat]).format(
                topic=theme,
                common_belief="the standard approach",
                number=random.choice(["50", "100", "500", "1000"]),
            )
            angle = random.choice(self.ANGLES[angle_cat])
            cta = random.choice(self.CTAS[cta_style])
            
            # Build prompt text
            prompt_text = self._build_prompt(
                theme=theme,
                hook=hook,
                angle=angle,
                cta=cta,
                tone=tone,
                format_type=fmt,
                platform=platform,
            )
            
            # Inject brand style
            branded_prompt = self._inject_brand_style(prompt_text)
            
            # Create template
            template = PromptTemplate(
                id=self._generate_id(),
                theme=theme,
                prompt_text=branded_prompt,
                tone=tone.value,
                format=fmt.value,
                platform=platform.value,
                brand_injected=True,
                hooks=[hook_cat],
                angles=[angle_cat],
                variables={
                    "topic": theme,
                    "hook_category": hook_cat,
                    "angle_category": angle_cat,
                    "cta_style": cta_style,
                },
                estimated_engagement=self._estimate_engagement(hook_cat, fmt.value),
                created_at=datetime.now().isoformat(),
            )
            
            prompts.append(template)
        
        # If still under minimum, generate more with random combinations
        while len(prompts) < min_prompts:
            hook_cat = random.choice(hook_categories)
            angle_cat = random.choice(angle_categories)
            tone = random.choice(tones)
            fmt = random.choice(formats)
            platform = random.choice(platforms)
            cta_style = random.choice(cta_styles)
            
            hook = random.choice(self.HOOKS[hook_cat]).format(
                topic=theme,
                common_belief="the standard approach",
                number=random.choice(["50", "100", "500", "1000"]),
            )
            angle = random.choice(self.ANGLES[angle_cat])
            cta = random.choice(self.CTAS[cta_style])
            
            prompt_text = self._build_prompt(
                theme=theme,
                hook=hook,
                angle=angle,
                cta=cta,
                tone=tone,
                format_type=fmt,
                platform=platform,
            )
            
            branded_prompt = self._inject_brand_style(prompt_text)
            
            template = PromptTemplate(
                id=self._generate_id(),
                theme=theme,
                prompt_text=branded_prompt,
                tone=tone.value,
                format=fmt.value,
                platform=platform.value,
                brand_injected=True,
                hooks=[hook_cat],
                angles=[angle_cat],
                variables={
                    "topic": theme,
                    "hook_category": hook_cat,
                    "angle_category": angle_cat,
                    "cta_style": cta_style,
                },
                estimated_engagement=self._estimate_engagement(hook_cat, fmt.value),
                created_at=datetime.now().isoformat(),
            )
            
            prompts.append(template)
        
        return PromptFactoryOutput(
            theme=theme,
            brand=self.brand_style.name,
            total_prompts=len(prompts),
            prompts=prompts,
            generation_metadata={
                "version": "1.2",
                "min_requested": min_prompts,
                "tones_used": [t.value for t in tones],
                "formats_used": [f.value for f in formats],
                "platforms_used": [p.value for p in platforms],
                "hook_categories": hook_categories,
                "angle_categories": angle_categories,
                "generated_at": datetime.now().isoformat(),
            },
        )
    
    def _build_prompt(
        self,
        theme: str,
        hook: str,
        angle: str,
        cta: str,
        tone: ContentTone,
        format_type: ContentFormat,
        platform: Platform,
    ) -> str:
        """Build the full prompt instruction."""
        platform_config = self.PLATFORM_CONFIGS.get(platform, {})
        max_length = platform_config.get("max_length", 280)
        
        prompt = f"""Generate social media content for {platform.value.upper()}.

THEME: {theme}
TONE: {tone.value}
FORMAT: {format_type.value}
MAX LENGTH: {max_length} characters

USE THIS HOOK:
"{hook}"

FOLLOW WITH THIS ANGLE:
"{angle}"

END WITH THIS CTA:
"{cta}"

REQUIREMENTS:
- Make it authentic and engaging
- Match the {tone.value} tone throughout
- Optimize for {platform.value} audience expectations
- Include relevant insights about {theme}
- Keep the hook punchy and attention-grabbing
"""
        
        if format_type == ContentFormat.THREAD:
            prompt += "\n- Structure as a thread with 5-7 parts"
            prompt += "\n- Each part should stand alone but flow together"
        elif format_type == ContentFormat.LIST:
            prompt += "\n- Include 5-7 actionable points"
            prompt += "\n- Make each point concrete and specific"
        elif format_type == ContentFormat.QUESTION:
            prompt += "\n- End with an engaging question"
            prompt += "\n- Encourage discussion and replies"
        
        return prompt
    
    def to_json(self, output: PromptFactoryOutput, indent: int = 2) -> str:
        """Convert output to JSON string."""
        data = {
            "theme": output.theme,
            "brand": output.brand,
            "total_prompts": output.total_prompts,
            "prompts": [asdict(p) for p in output.prompts],
            "generation_metadata": output.generation_metadata,
        }
        return json.dumps(data, indent=indent, ensure_ascii=False)
    
    def to_dict(self, output: PromptFactoryOutput) -> Dict[str, Any]:
        """Convert output to dictionary."""
        return {
            "theme": output.theme,
            "brand": output.brand,
            "total_prompts": output.total_prompts,
            "prompts": [asdict(p) for p in output.prompts],
            "generation_metadata": output.generation_metadata,
        }


# Convenience function for quick generation
def generate_prompts(
    theme: str,
    brand_name: str = "default",
    brand_voice: str = "professional yet approachable",
    min_prompts: int = 100,
) -> str:
    """
    Quick prompt generation with minimal configuration.
    
    Args:
        theme: Topic to generate prompts for
        brand_name: Name of the brand
        brand_voice: Voice/tone description
        min_prompts: Minimum number of prompts
    
    Returns:
        JSON string with all generated prompts
    """
    brand = BrandStyle(name=brand_name, voice=brand_voice)
    factory = PromptFactoryService(brand_style=brand)
    output = factory.generate_prompts(theme=theme, min_prompts=min_prompts)
    return factory.to_json(output)


if __name__ == "__main__":
    # Demo: Generate prompts for "AI Productivity"
    brand = BrandStyle(
        name="TechInsider",
        voice="knowledgeable but conversational, like a smart friend explaining tech",
        values=["innovation", "practicality", "clarity"],
        preferred_phrases=["Here's the thing", "Game-changer", "Let's break this down"],
        forbidden_words=["synergy", "leverage", "paradigm"],
        emoji_style="moderate",
        hashtag_strategy="strategic",
        cta_style="direct",
    )
    
    factory = PromptFactoryService(brand_style=brand)
    
    result = factory.generate_prompts(
        theme="AI Productivity",
        min_prompts=100,
        platforms=[Platform.TWITTER, Platform.LINKEDIN],
    )
    
    print(f"Generated {result.total_prompts} prompts for theme: {result.theme}")
    print(f"Brand: {result.brand}")
    print("\n--- Sample Prompts ---\n")
    
    for prompt in result.prompts[:3]:
        print(f"ID: {prompt.id}")
        print(f"Platform: {prompt.platform} | Format: {prompt.format} | Tone: {prompt.tone}")
        print(f"Engagement Estimate: {prompt.estimated_engagement}")
        print(f"Prompt:\n{prompt.prompt_text[:500]}...")
        print("-" * 50)
    
    # Output full JSON
    json_output = factory.to_json(result)
    print(f"\n\nFull JSON output length: {len(json_output)} characters")
