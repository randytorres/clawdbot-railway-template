/**
 * BRAND STYLE INJECTION SYSTEM
 * 
 * AC Brand DNA: Batman × Sicario × Aztec vault energy
 * Cinematic, luxury-street, high-fashion meets mythology
 */

export interface BrandStyleProfile {
  name: string;
  version: string;
  coreIdentity: CoreIdentity;
  voiceAttributes: VoiceAttributes;
  vocabulary: VocabularySystem;
  structuralPatterns: StructuralPatterns;
  forbidden: ForbiddenElements;
  injectionRules: InjectionRule[];
}

export interface CoreIdentity {
  archetype: string;
  essence: string[];
  mood: string;
  visualAnalogy: string;
}

export interface VoiceAttributes {
  temperature: 'cold' | 'cool' | 'warm' | 'hot';
  velocity: 'measured' | 'deliberate' | 'urgent' | 'frenetic';
  distance: 'intimate' | 'personal' | 'social' | 'public';
  elevation: 'ground' | 'street' | 'temple' | 'celestial';
}

export interface VocabularySystem {
  preferred: string[];
  contextual: Record<string, string[]>;
  intensifiers: string[];
  transitions: string[];
}

export interface StructuralPatterns {
  sentenceRhythm: string;
  paragraphArchitecture: string;
  openingTypes: string[];
  closingTypes: string[];
}

export interface ForbiddenElements {
  words: string[];
  phrases: string[];
  structures: string[];
  tones: string[];
}

export interface InjectionRule {
  trigger: string | RegExp;
  action: 'replace' | 'append' | 'prepend' | 'enhance';
  target: string;
  weight: number;
}

// ═══════════════════════════════════════════════════════════════
// AC BRAND STYLE PROFILE
// ═══════════════════════════════════════════════════════════════

export const ACBrandProfile: BrandStyleProfile = {
  name: 'AC (Advanced Cultivators)',
  version: '1.2.0',
  
  coreIdentity: {
    archetype: 'The Alchemist-Guardian',
    essence: [
      'obsidian precision',
      'temple reverence', 
      'street discipline',
      'bloodline authenticity',
      'shadowed exclusivity',
      'measured power'
    ],
    mood: 'Cinematic intensity with withheld violence',
    visualAnalogy: 'A blade wrapped in silk, resting on volcanic stone'
  },

  voiceAttributes: {
    temperature: 'cool',
    velocity: 'deliberate',
    distance: 'personal', // Close enough to whisper, not shouting
    elevation: 'temple'   // Above street, below celestial
  },

  vocabulary: {
    preferred: [
      'cultivar', 'lineage', 'expression', 'terroir', 'appellation',
      'covenant', 'vigil', 'witness', 'keeper', 'archivist',
      'obsidian', 'tempered', 'forged', 'annealed', 'crystalline',
      'measured', 'deliberate', 'intentional', 'precise', 'exact',
      'vault', 'sanctum', 'archive', 'temple', 'chamber',
      'bloodline', 'heritage', 'ancestral', 'inherited', 'earned',
      'shadow', 'depth', 'density', 'weight', 'gravity'
    ],
    
    contextual: {
      quality: ['tempered', 'annealed', 'crystallized', 'settled', 'proven'],
      time: ['vintage', 'season', 'epoch', 'cycle', 'generation'],
      exclusivity: ['appointed', 'summoned', 'recognized', 'admitted', 'initiated'],
      knowledge: ['discernment', 'distinction', 'recognition', 'attunement', 'sensitivity'],
      craft: ['forged', 'tempered', 'wrought', 'fashioned', 'realized'],
      effect: ['emergence', 'unfolding', 'revelation', 'deepening', 'clearing']
    },
    
    intensifiers: [
      'unmistakable', 'undeniable', 'profound', 'total', 'absolute',
      'immaculate', 'perfected', 'flawless', 'complete', 'resolute'
    ],
    
    transitions: [
      'Here,', 'In this,', 'Where', 'Through this,', 'Within',
      'Consider', 'Observe', 'Recognize', 'Understand that'
    ]
  },

  structuralPatterns: {
    sentenceRhythm: 'Varied length with strategic fragmentation. Short punch. Then longer flowing prose that carries weight. Then stop.',
    paragraphArchitecture: 'Opening statement of position. Supporting evidence without defense. Closing that implies continuation.',
    openingTypes: [
      'Direct claim without preamble',
      'Sensory anchor that grounds the abstract',
      'Contrarian statement that challenges assumption',
      'Question that presumes shared knowledge'
    ],
    closingTypes: [
      'Implication that work continues',
      'Invitation to prove worthiness',
      'Statement of permanent availability',
      'Question that extends beyond the text'
    ]
  },

  forbidden: {
    words: [
      'amazing', 'awesome', 'best', 'great', 'good',
      'weed', 'pot', 'dope', 'grass', 'ganja',
      'stoned', 'high', 'baked', 'blazed',
      'chill', 'relax', 'mellow', 'vibe',
      'cheap', 'deal', 'discount', 'sale',
      'fun', 'party', 'hang out', 'get together',
      'just', 'simply', 'basically', 'literally',
      'revolutionary', 'disruptive', 'innovative', 'game-changing'
    ],
    
    phrases: [
      'you deserve',
      'treat yourself',
      'don\'t miss out',
      'limited time',
      'act now',
      'once in a lifetime',
      'life changing',
      'unbelievable',
      'mind blowing',
      'unlike anything you\'ve ever',
      'we believe that',
      'our mission is',
      'at AC, we',
      'we pride ourselves'
    ],
    
    structures: [
      'Exclamation points',
      'All caps for emphasis',
      'Multiple punctuation (!!!, ???)',
      'Bullet lists in emotional copy',
      'Excessive paragraph breaks',
      'Rhetorical questions that answer themselves'
    ],
    
    tones: [
      'Breathless excitement',
      'Corporate professionalism',
      'Bro culture casualness',
      'Medical clinicalness',
      'Hippie mysticism',
      'Aggressive hustle'
    ]
  },

  injectionRules: [
    {
      trigger: /\b(product|item|thing)\b/gi,
      action: 'replace',
      target: 'artifact',
      weight: 0.9
    },
    {
      trigger: /\b(very|really|so) (good|great|nice)\b/gi,
      action: 'replace',
      target: 'precise',
      weight: 1.0
    },
    {
      trigger: /\b(strain)\b/gi,
      action: 'replace',
      target: 'cultivar',
      weight: 1.0
    },
    {
      trigger: /\b(best|top|#1)\b/gi,
      action: 'replace',
      target: 'without equal in this expression',
      weight: 0.8
    },
    {
      trigger: /\b(try|check out|give it a shot)\b/gi,
      action: 'replace',
      target: 'experience',
      weight: 0.9
    },
    {
      trigger: /!$/,
      action: 'replace',
      target: '.',
      weight: 1.0
    },
    {
      trigger: /\.\s*$/,
      action: 'enhance',
      target: '', // Context-dependent enhancement
      weight: 0.3
    }
  ]
};

// ═══════════════════════════════════════════════════════════════
// STYLE INJECTION ENGINE
// ═══════════════════════════════════════════════════════════════

export class StyleInjector {
  private profile: BrandStyleProfile;

  constructor(profile: BrandStyleProfile = ACBrandProfile) {
    this.profile = profile;
  }

  /**
   * Apply brand style to generated prompt text
   */
  inject(prompt: string): string {
    let styled = prompt;

    // Apply replacement rules
    for (const rule of this.profile.injectionRules) {
      if (rule.action === 'replace') {
        const regex = typeof rule.trigger === 'string' 
          ? new RegExp(rule.trigger, 'gi')
          : rule.trigger;
        styled = styled.replace(regex, rule.target);
      }
    }

    // Enforce forbidden words
    for (const forbidden of this.profile.forbidden.words) {
      const regex = new RegExp(`\\b${forbidden}\\b`, 'gi');
      if (regex.test(styled)) {
        // Mark for review rather than auto-replace (preserves intent)
        styled = styled.replace(regex, `[STYLE:${forbidden}]`);
      }
    }

    return styled;
  }

  /**
   * Validate prompt against brand style
   */
  validate(prompt: string): StyleValidation {
    const violations: StyleViolation[] = [];
    let score = 1.0;

    // Check forbidden words
    for (const forbidden of this.profile.forbidden.words) {
      const regex = new RegExp(`\\b${forbidden}\\b`, 'gi');
      const matches = prompt.match(regex);
      if (matches) {
        violations.push({
          type: 'forbidden_word',
          severity: 'critical',
          message: `Found forbidden word: "${forbidden}"`,
          location: matches.index?.toString() || 'unknown',
          suggestion: this.suggestAlternative(forbidden)
        });
        score -= 0.1 * matches.length;
      }
    }

    // Check forbidden phrases
    for (const forbidden of this.profile.forbidden.phrases) {
      if (prompt.toLowerCase().includes(forbidden.toLowerCase())) {
        violations.push({
          type: 'forbidden_phrase',
          severity: 'high',
          message: `Found forbidden phrase: "${forbidden}"`,
          location: 'inline',
          suggestion: 'Rewrite with direct, specific language'
        });
        score -= 0.15;
      }
    }

    // Check structural violations
    if (prompt.includes('!!!') || prompt.includes('???')) {
      violations.push({
        type: 'structural',
        severity: 'medium',
        message: 'Multiple punctuation marks detected',
        location: 'inline',
        suggestion: 'Use single, deliberate punctuation'
      });
      score -= 0.1;
    }

    // Check for exclamation points (brand uses periods)
    const exclamations = (prompt.match(/!/g) || []).length;
    if (exclamations > 0) {
      violations.push({
        type: 'structural',
        severity: 'medium',
        message: `${exclamations} exclamation point(s) found`,
        location: 'inline',
        suggestion: 'Replace with periods for measured tone'
      });
      score -= 0.05 * exclamations;
    }

    // Check vocabulary alignment
    const preferredCount = this.profile.vocabulary.preferred.filter(word => 
      prompt.toLowerCase().includes(word.toLowerCase())
    ).length;
    const vocabularyDensity = preferredCount / prompt.split(/\s+/).length;
    
    if (vocabularyDensity < 0.02) {
      violations.push({
        type: 'vocabulary',
        severity: 'low',
        message: 'Low brand vocabulary density',
        location: 'global',
        suggestion: 'Incorporate preferred brand terms'
      });
      score -= 0.1;
    }

    return {
      score: Math.max(0, score),
      violations,
      aligned: violations.filter(v => v.severity === 'critical').length === 0
    };
  }

  /**
   * Suggest alternative for forbidden word
   */
  private suggestAlternative(forbidden: string): string {
    const alternatives: Record<string, string> = {
      'amazing': 'precise',
      'awesome': 'immaculate',
      'best': 'without parallel',
      'great': 'remarkable',
      'good': 'sound',
      'weed': 'cultivar',
      'pot': 'flower',
      'dope': 'expression',
      'stoned': 'altered',
      'high': 'elevated',
      'chill': 'composed',
      'relax': 'release',
      'fun': 'engagement',
      'party': 'assembly'
    };
    return alternatives[forbidden] || 'revise for brand alignment';
  }

  /**
   * Generate style guide summary for prompt context
   */
  getStyleContext(): string {
    return `
BRAND VOICE GUIDE:
- Archetype: ${this.profile.coreIdentity.archetype}
- Temperature: ${this.profile.voiceAttributes.temperature}
- Velocity: ${this.profile.voiceAttributes.velocity}
- Key essence: ${this.profile.coreIdentity.essence.slice(0, 3).join(', ')}

VOCABULARY ANCHORS:
${this.profile.vocabulary.preferred.slice(0, 10).join(', ')}

ABSOLUTELY FORBIDDEN:
${this.profile.forbidden.words.slice(0, 8).join(', ')}...

STRUCTURAL NOTES:
${this.profile.structuralPatterns.sentenceRhythm}
`.trim();
  }
}

export interface StyleValidation {
  score: number;
  violations: StyleViolation[];
  aligned: boolean;
}

export interface StyleViolation {
  type: 'forbidden_word' | 'forbidden_phrase' | 'structural' | 'vocabulary' | 'tone';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  location: string;
  suggestion: string;
}

export default StyleInjector;
