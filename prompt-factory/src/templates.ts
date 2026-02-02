/**
 * LOKI'S DOMAIN: Prompt Templates & Quality Criteria
 * 
 * Template architecture for combinatorial expansion.
 * Each template defines slots that can be filled from category banks.
 */

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  slots: TemplateSlot[];
  basePrompt: string;
  outputFormat: string;
  qualityCriteria: QualityCriterion[];
  brandAlignment: BrandAlignmentRule[];
}

export interface TemplateSlot {
  name: string;
  category: string;
  required: boolean;
  allowMultiple: boolean;
  maxSelections: number;
}

export interface QualityCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  validator: (prompt: string) => number; // 0-1 score
}

export interface BrandAlignmentRule {
  aspect: 'tone' | 'vocabulary' | 'structure' | 'imagery' | 'pacing';
  priority: 'critical' | 'high' | 'medium' | 'low';
  keywords: string[];
  forbidden: string[];
}

// ═══════════════════════════════════════════════════════════════
// TEMPLATE LIBRARY - Combinatorial Expansion Engine
// ═══════════════════════════════════════════════════════════════

export const promptTemplates: PromptTemplate[] = [
  // ─────────────────────────────────────────────────────────────
  // TEMPLATE 1: Product Description Generator
  // ─────────────────────────────────────────────────────────────
  {
    id: 'product-desc',
    name: 'Luxury Product Description',
    description: 'Cinematic product descriptions with mythological undertones',
    slots: [
      { name: 'productType', category: 'product_types', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'mood', category: 'moods', required: true, allowMultiple: true, maxSelections: 2 },
      { name: 'aesthetic', category: 'aesthetics', required: true, allowMultiple: true, maxSelections: 2 },
      { name: 'audience', category: 'audiences', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'ritual', category: 'rituals', required: false, allowMultiple: false, maxSelections: 1 }
    ],
    basePrompt: `Create a product description for a {{productType}} that transcends the ordinary. 

The narrative should evoke {{mood}} through {{aesthetic}} visual language. 

Speak directly to {{audience}}. {{ritual}}.

Length: 3-4 sentences. No generic superlatives. No exclamation points.`,
    outputFormat: 'markdown',
    qualityCriteria: [
      { id: 'specificity', name: 'Specific Detail Density', description: 'Contains concrete, non-generic details', weight: 0.25, validator: () => 0 },
      { id: 'emotion', name: 'Emotional Resonance', description: 'Evokes feeling without stating it directly', weight: 0.25, validator: () => 0 },
      { id: 'rhythm', name: 'Prose Rhythm', description: 'Varied sentence structure, cinematic pacing', weight: 0.20, validator: () => 0 },
      { id: 'uniqueness', name: 'Lexical Uniqueness', description: 'Avoids cliché industry language', weight: 0.30, validator: () => 0 }
    ],
    brandAlignment: [
      { aspect: 'tone', priority: 'critical', keywords: ['precision', 'shadow', 'vault', 'ritual', 'obsidian', 'obsidian'], forbidden: ['amazing', 'awesome', 'best', 'revolutionary'] },
      { aspect: 'vocabulary', priority: 'high', keywords: ['craft', 'cultivar', 'lineage', 'terroir', 'appellation'], forbidden: ['weed', 'pot', 'dope', 'stuff'] },
      { aspect: 'imagery', priority: 'high', keywords: ['temple', 'ceremony', 'artifact', 'bloodline', 'covenant'], forbidden: ['party', 'get high', 'stoned'] }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // TEMPLATE 2: Brand Voice Guidelines
  // ─────────────────────────────────────────────────────────────
  {
    id: 'brand-voice',
    name: 'Brand Voice Definition',
    description: 'Internal voice guidelines for consistent brand expression',
    slots: [
      { name: 'archetype', category: 'archetypes', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'contrast', category: 'contrasts', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'origin', category: 'origins', required: true, allowMultiple: false, maxSelections: 1 }
    ],
    basePrompt: `Define a brand voice that embodies the {{archetype}} archetype while maintaining {{contrast}} tension throughout all communications.

Root this voice in {{origin}} mythology and symbolism.

Provide:
- 3 voice principles (DO)
- 3 voice prohibitions (DON'T)
- 5 signature phrases
- 1 paragraph example copy`,
    outputFormat: 'markdown',
    qualityCriteria: [
      { id: 'consistency', name: 'Internal Consistency', description: 'All elements align with core archetype', weight: 0.30, validator: () => 0 },
      { id: 'actionable', name: 'Actionable Guidance', description: 'Clear enough for writers to apply', weight: 0.25, validator: () => 0 },
      { id: 'differentiation', name: 'Market Differentiation', description: 'Distinct from competitors', weight: 0.25, validator: () => 0 },
      { id: 'depth', name: 'Conceptual Depth', description: 'Layers of meaning to explore', weight: 0.20, validator: () => 0 }
    ],
    brandAlignment: [
      { aspect: 'tone', priority: 'critical', keywords: ['measured', 'deliberate', 'weighty', 'intentional'], forbidden: ['casual', 'chill', 'laid back'] },
      { aspect: 'structure', priority: 'medium', keywords: ['hierarchy', 'architecture', 'foundation'], forbidden: ['random', 'whatever'] }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // TEMPLATE 3: Launch Campaign Narrative
  // ─────────────────────────────────────────────────────────────
  {
    id: 'launch-campaign',
    name: 'Product Launch Narrative',
    description: 'Cinematic launch story arc with mythological framing',
    slots: [
      { name: 'artifact', category: 'artifacts', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'journey', category: 'journeys', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'threshold', category: 'thresholds', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'guardian', category: 'guardians', required: false, allowMultiple: false, maxSelections: 1 }
    ],
    basePrompt: `Craft a launch campaign narrative structured as a {{journey}} quest.

The product is the {{artifact}}—an object of power and desire.
{{guardian}} protects the threshold at {{threshold}}.

Structure:
- Teaser (The Prophecy)
- Reveal (The Unveiling)
- Ritual (The Initiation)
- Legacy (The Covenant)

Each phase: headline + 2 sentences max.`,
    outputFormat: 'markdown',
    qualityCriteria: [
      { id: 'arc', name: 'Narrative Arc', description: 'Clear progression with rising tension', weight: 0.30, validator: () => 0 },
      { id: 'mystery', name: 'Mystery Preservation', description: 'Reveals without explaining everything', weight: 0.25, validator: () => 0 },
      { id: 'ritual', name: 'Ritual Completeness', description: 'Each phase feels like a ceremony', weight: 0.25, validator: () => 0 },
      { id: 'memorability', name: 'Phrasal Memorability', description: 'Headlines that stick', weight: 0.20, validator: () => 0 }
    ],
    brandAlignment: [
      { aspect: 'tone', priority: 'critical', keywords: ['legendary', 'ancient', 'forbidden', 'sacred'], forbidden: ['new', 'improved', 'better than'] },
      { aspect: 'pacing', priority: 'high', keywords: ['deliberate', 'measured', 'patient'], forbidden: ['hurry', 'limited time', 'act now'] }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // TEMPLATE 4: Strain Origin Story
  // ─────────────────────────────────────────────────────────────
  {
    id: 'strain-origin',
    name: 'Cannabis Strain Origin Narrative',
    description: 'Lineage stories with terroir and bloodline mythology',
    slots: [
      { name: 'region', category: 'regions', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'element', category: 'elements', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'keeper', category: 'keepers', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'marker', category: 'markers', required: true, allowMultiple: true, maxSelections: 3 }
    ],
    basePrompt: `Tell the origin story of a cultivar from {{region}}, where {{element}} shaped its character.

{{keeper}} has safeguarded this lineage for generations.

Key characteristics to weave in: {{marker}}

Format: 
- Opening: Geographic + elemental invocation (1 sentence)
- Body: The keeper's covenant with the plant (2-3 sentences)
- Close: Signature experience (1 sentence)

Never mention THC percentages or medical claims.`,
    outputFormat: 'markdown',
    qualityCriteria: [
      { id: 'terroir', name: 'Terroir Expression', description: 'Place and environment drive character', weight: 0.30, validator: () => 0 },
      { id: 'lineage', name: 'Lineage Depth', description: 'Sense of inherited knowledge', weight: 0.25, validator: () => 0 },
      { id: 'sensory', name: 'Sensory Precision', description: 'Specific, evocative descriptors', weight: 0.25, validator: () => 0 },
      { id: 'restraint', name: 'Narrative Restraint', description: 'Shows, never tells effects', weight: 0.20, validator: () => 0 }
    ],
    brandAlignment: [
      { aspect: 'vocabulary', priority: 'critical', keywords: ['cultivar', 'heritage', 'expression', 'phenotype'], forbidden: ['strain', 'weed', 'bud'] },
      { aspect: 'imagery', priority: 'high', keywords: ['mountain', 'valley', 'mist', 'earth', 'fire'], forbidden: ['lab', 'synthetic', 'processed'] }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // TEMPLATE 5: Event Invitation / Ritual Summons
  // ─────────────────────────────────────────────────────────────
  {
    id: 'ritual-summons',
    name: 'Exclusive Event Summons',
    description: 'Invitation as ritual summons with gatekeeping language',
    slots: [
      { name: 'occasion', category: 'occasions', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'assembly', category: 'assemblies', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'credential', category: 'credentials', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'price', category: 'prices', required: false, allowMultiple: false, maxSelections: 1 }
    ],
    basePrompt: `Compose a summons for {{occasion}}—an assembly of {{assembly}}.

Admission requires {{credential}}. {{price}}

Structure:
- Header: Single commanding phrase
- Body: 2 sentences establishing stakes and exclusivity
- CTA: Imperative, no urgency, no countdown

Avoid: exclamation points, ALL CAPS, emojis, "Don't miss out!"`,
    outputFormat: 'markdown',
    qualityCriteria: [
      { id: 'exclusivity', name: 'Exclusivity Conveyance', description: 'Clear gatekeeping without being obnoxious', weight: 0.30, validator: () => 0 },
      { id: 'dignity', name: 'Dignified Imperative', description: 'Commands respect without begging', weight: 0.25, validator: () => 0 },
      { id: 'intrigue', name: 'Intrigue Generation', description: 'Makes recipient want to qualify', weight: 0.25, validator: () => 0 },
      { id: 'brevity', name: 'Compression Power', description: 'Maximum impact, minimum words', weight: 0.20, validator: () => 0 }
    ],
    brandAlignment: [
      { aspect: 'tone', priority: 'critical', keywords: ['summon', 'convene', 'assemble', 'bear witness'], forbidden: ['join us', 'come party', 'everyone welcome'] },
      { aspect: 'structure', priority: 'high', keywords: ['hierarchy', 'protocol', 'rite'], forbidden: ['fun', 'good time', 'hang out'] }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // TEMPLATE 6: Partnership Outreach
  // ─────────────────────────────────────────────────────────────
  {
    id: 'partnership-outreach',
    name: 'B2B Partnership Approach',
    description: 'Cold outreach with covenant framing instead of sales pitch',
    slots: [
      { name: 'relation', category: 'relations', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'mutual', category: 'mutuals', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'proof', category: 'proofs', required: true, allowMultiple: false, maxSelections: 1 }
    ],
    basePrompt: `Draft a partnership approach positioning the sender as {{relation}} seeking {{mutual}}.

Establish credibility through {{proof}}.

Constraints:
- 4 sentences maximum
- No benefit lists
- No "I think" or "We believe"
- One concrete, specific offer
- Close with question that demands thought, not just yes/no`,
    outputFormat: 'markdown',
    qualityCriteria: [
      { id: 'respect', name: 'Recipient Respect', description: 'Acknowledges their standing', weight: 0.30, validator: () => 0 },
      { id: 'clarity', name: 'Offer Clarity', description: 'Specific, not vague opportunities', weight: 0.25, validator: () => 0 },
      { id: 'question', name: 'Question Quality', description: 'Prompts meaningful engagement', weight: 0.25, validator: () => 0 },
      { id: 'brevity', name: 'Compression', description: 'Every word earns its place', weight: 0.20, validator: () => 0 }
    ],
    brandAlignment: [
      { aspect: 'tone', priority: 'critical', keywords: ['covenant', 'alignment', 'shared purpose'], forbidden: ['partnership opportunity', 'synergy', 'value add'] },
      { aspect: 'structure', priority: 'medium', keywords: ['direct', 'unequivocal', 'decisive'], forbidden: ['just', 'maybe', 'possibly'] }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // TEMPLATE 7: Educational / Thought Leadership
  // ─────────────────────────────────────────────────────────────
  {
    id: 'thought-leadership',
    name: 'Thought Leadership Piece',
    description: 'Educational content with authoritative but mysterious tone',
    slots: [
      { name: 'domain', category: 'domains', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'revelation', category: 'revelations', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'parable', category: 'parables', required: true, allowMultiple: false, maxSelections: 1 }
    ],
    basePrompt: `Write a thought leadership piece on {{domain}} that reveals {{revelation}}.

Use {{parable}} as the structural framework.

Requirements:
- Opening: Contrarian or unexpected claim
- Middle: 3 insights, each with concrete example
- Close: Open-ended question that implies continuation
- Tone: Authoritative but not arrogant, mysterious but not cryptic

Length: 300-400 words. No bullet lists.`,
    outputFormat: 'markdown',
    qualityCriteria: [
      { id: 'originality', name: 'Intellectual Originality', description: 'Fresh perspective, not compilation', weight: 0.30, validator: () => 0 },
      { id: 'example', name: 'Example Concreteness', description: 'Specific cases, not abstractions', weight: 0.25, validator: () => 0 },
      { id: 'rhythm', name: 'Reading Rhythm', description: 'Paragraphs flow with intention', weight: 0.20, validator: () => 0 },
      { id: 'provocation', name: 'Gentle Provocation', description: 'Challenges without attacking', weight: 0.25, validator: () => 0 }
    ],
    brandAlignment: [
      { aspect: 'tone', priority: 'critical', keywords: ['measured', 'deliberate', 'earned wisdom'], forbidden: ['obviously', 'everyone knows', 'simply'] },
      { aspect: 'vocabulary', priority: 'high', keywords: ['discernment', 'rigor', 'craft'], forbidden: ['hacks', 'secrets', 'tricks'] }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // TEMPLATE 8: Customer Testimonial Framework
  // ─────────────────────────────────────────────────────────────
  {
    id: 'testimonial-framework',
    name: 'Customer Testimonial Structure',
    description: 'Testimonial prompts that yield cinematic customer stories',
    slots: [
      { name: 'experience', category: 'experiences', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'transformation', category: 'transformations', required: true, allowMultiple: false, maxSelections: 1 },
      { name: 'setting', category: 'settings', required: true, allowMultiple: false, maxSelections: 1 }
    ],
    basePrompt: `Create a testimonial prompt framework for customers who experienced {{experience}} leading to {{transformation}}.

The setting/context: {{setting}}

Provide:
1. One guiding question that elicits sensory detail
2. One guiding question that draws out emotional shift
3. One guiding question that connects to identity/self-concept
4. A 2-sentence example response in the target voice

Never ask "How did it make you feel?" or "Would you recommend us?"`,
    outputFormat: 'markdown',
    qualityCriteria: [
      { id: 'elicit', name: 'Elicitation Power', description: 'Questions yield rich responses', weight: 0.30, validator: () => 0 },
      { id: 'authenticity', name: 'Authenticity Preservation', description: 'Sounds like real person, not marketing', weight: 0.30, validator: () => 0 },
      { id: 'specificity', name: 'Detail Guidance', description: 'Leads to concrete not vague answers', weight: 0.25, validator: () => 0 },
      { id: 'example', name: 'Example Quality', description: 'Demonstrates desired output', weight: 0.15, validator: () => 0 }
    ],
    brandAlignment: [
      { aspect: 'tone', priority: 'critical', keywords: ['personal', 'intimate', 'revelatory'], forbidden: ['amazing product', 'life changing', 'best ever'] },
      { aspect: 'vocabulary', priority: 'medium', keywords: ['moment', 'realization', 'shift'], forbidden: ['awesome', 'incredible', 'unbelievable'] }
    ]
  }
];

export default promptTemplates;
