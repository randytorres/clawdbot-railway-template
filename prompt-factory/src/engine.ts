/**
 * PROMPT FACTORY - Core Generation Engine
 * 
 * Friday's domain: Combinatorial expansion, template rendering,
 * brand injection, and diversity optimization.
 */

import { PromptTemplate, TemplateSlot } from './templates';
import { categoryRegistry, CategoryValue, CategoryBank } from './categories';
import { StyleInjector, ACBrandProfile, StyleValidation } from './brand';
import { DiversityScorer, PromptDiversity, DiversityScore } from './diversity';

export interface GenerationConfig {
  targetCount: number;
  templates?: string[]; // Specific templates to use, or all
  minDiversityScore?: number;
  enforceBrandStyle?: boolean;
  outputFormat?: 'json' | 'markdown' | 'yaml';
  seed?: number;
}

export interface GeneratedPrompt {
  id: string;
  template: string;
  prompt: string;
  rawPrompt: string;
  categories: Record<string, string>;
  tags: string[];
  intensity: 'subtle' | 'moderate' | 'intense';
  brandValidation: StyleValidation;
  metadata: {
    generatedAt: string;
    version: string;
  };
}

export interface GenerationResult {
  prompts: GeneratedPrompt[];
  diversityScore: DiversityScore;
  stats: GenerationStats;
}

export interface GenerationStats {
  totalAttempted: number;
  totalGenerated: number;
  brandViolations: number;
  averageDiversity: number;
  templateDistribution: Record<string, number>;
  generationTime: number;
}

// ═══════════════════════════════════════════════════════════════
// GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════

export class PromptFactory {
  private styleInjector: StyleInjector;
  private diversityScorer: DiversityScorer;
  private templates: PromptTemplate[];

  constructor(templates: PromptTemplate[]) {
    this.styleInjector = new StyleInjector(ACBrandProfile);
    this.diversityScorer = new DiversityScorer();
    this.templates = templates;
  }

  /**
   * Generate prompts via combinatorial expansion
   */
  generate(config: GenerationConfig): GenerationResult {
    const startTime = Date.now();
    
    // Filter templates if specified
    const activeTemplates = config.templates && config.templates.length > 0
      ? this.templates.filter(t => config.templates!.includes(t.id))
      : this.templates;

    const generated: GeneratedPrompt[] = [];
    const attempted = new Set<string>();
    let attempts = 0;
    const maxAttempts = config.targetCount * 10; // Prevent infinite loops

    while (generated.length < config.targetCount && attempts < maxAttempts) {
      attempts++;

      // Select template with weighted distribution
      const template = this.selectTemplate(activeTemplates, generated);
      
      // Generate slot combinations
      const slotValues = this.fillSlots(template.slots);
      
      // Create unique key for deduplication
      const combinationKey = `${template.id}:${JSON.stringify(slotValues)}`;
      if (attempted.has(combinationKey)) {
        continue;
      }
      attempted.add(combinationKey);

      // Render prompt
      const rawPrompt = this.renderTemplate(template, slotValues);
      
      // Apply brand injection
      const styledPrompt = config.enforceBrandStyle !== false
        ? this.styleInjector.inject(rawPrompt)
        : rawPrompt;

      // Validate brand alignment
      const brandValidation = this.styleInjector.validate(styledPrompt);

      // Check if meets minimum brand standards
      if (config.enforceBrandStyle !== false && brandValidation.score < 0.6) {
        continue; // Skip this combination
      }

      // Calculate intensity
      const intensity = this.calculateIntensity(slotValues, template);

      // Collect tags
      const tags = this.collectTags(slotValues);

      // Create prompt object
      const prompt: GeneratedPrompt = {
        id: `pf-${Date.now()}-${generated.length.toString().padStart(4, '0')}`,
        template: template.id,
        prompt: styledPrompt,
        rawPrompt,
        categories: slotValues,
        tags,
        intensity,
        brandValidation,
        metadata: {
          generatedAt: new Date().toISOString(),
          version: '1.2.0'
        }
      };

      generated.push(prompt);

      // Add to diversity scorer
      this.diversityScorer.addPrompt({
        id: prompt.id,
        prompt: prompt.prompt,
        template: prompt.template,
        categories: prompt.categories,
        intensity: prompt.intensity,
        tags: prompt.tags
      });
    }

    const generationTime = Date.now() - startTime;
    const diversityScore = this.diversityScorer.calculateScore();

    // Calculate stats
    const templateDistribution: Record<string, number> = {};
    for (const p of generated) {
      templateDistribution[p.template] = (templateDistribution[p.template] || 0) + 1;
    }

    const stats: GenerationStats = {
      totalAttempted: attempts,
      totalGenerated: generated.length,
      brandViolations: generated.filter(p => !p.brandValidation.aligned).length,
      averageDiversity: diversityScore.overall,
      templateDistribution,
      generationTime
    };

    return {
      prompts: generated,
      diversityScore,
      stats
    };
  }

  /**
   * Select template with bias toward underused ones
   */
  private selectTemplate(templates: PromptTemplate[], generated: GeneratedPrompt[]): PromptTemplate {
    const usage = new Map<string, number>();
    for (const p of generated) {
      usage.set(p.template, (usage.get(p.template) || 0) + 1);
    }

    // Weight by inverse usage
    const weights = templates.map(t => {
      const count = usage.get(t.id) || 0;
      return 1 / (1 + count * 0.5);
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < templates.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return templates[i];
      }
    }

    return templates[0];
  }

  /**
   * Fill template slots with category values
   */
  private fillSlots(slots: TemplateSlot[]): Record<string, string> {
    const values: Record<string, string> = {};

    for (const slot of slots) {
      const category = categoryRegistry[slot.category];
      if (!category) {
        values[slot.name] = `[unknown:${slot.category}]`;
        continue;
      }

      if (slot.allowMultiple) {
        // Select multiple values
        const count = Math.floor(Math.random() * slot.maxSelections) + 1;
        const selected = this.weightedSample(category, count);
        values[slot.name] = selected.map(v => v.value).join(' and ');
      } else {
        // Select single value
        const selected = this.weightedSample(category, 1)[0];
        values[slot.name] = selected.value;
      }
    }

    return values;
  }

  /**
   * Sample category values with weight bias
   */
  private weightedSample(category: CategoryBank, count: number): CategoryValue[] {
    const available = [...category.values];
    const selected: CategoryValue[] = [];

    for (let i = 0; i < count && available.length > 0; i++) {
      const totalWeight = available.reduce((sum, v) => sum + v.weight, 0);
      let random = Math.random() * totalWeight;

      for (let j = 0; j < available.length; j++) {
        random -= available[j].weight;
        if (random <= 0) {
          selected.push(available[j]);
          available.splice(j, 1);
          break;
        }
      }
    }

    return selected;
  }

  /**
   * Render template with filled slots
   */
  private renderTemplate(template: PromptTemplate, values: Record<string, string>): string {
    let rendered = template.basePrompt;

    for (const [key, value] of Object.entries(values)) {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(placeholder, value);
    }

    return rendered;
  }

  /**
   * Calculate overall intensity from slot values
   */
  private calculateIntensity(
    values: Record<string, string>, 
    template: PromptTemplate
  ): 'subtle' | 'moderate' | 'intense' {
    let intensityScore = 0;
    let count = 0;

    for (const [slotName, value] of Object.entries(values)) {
      const slot = template.slots.find(s => s.name === slotName);
      if (!slot) continue;

      const category = categoryRegistry[slot.category];
      if (!category) continue;

      const categoryValue = category.values.find(v => v.value === value);
      if (categoryValue) {
        const score = categoryValue.intensity === 'subtle' ? 1 : 
                      categoryValue.intensity === 'moderate' ? 2 : 3;
        intensityScore += score;
        count++;
      }
    }

    const average = count > 0 ? intensityScore / count : 2;
    
    if (average < 1.5) return 'subtle';
    if (average > 2.3) return 'intense';
    return 'moderate';
  }

  /**
   * Collect tags from selected values
   */
  private collectTags(values: Record<string, string>): string[] {
    const tags = new Set<string>();

    for (const [slotName, value] of Object.entries(values)) {
      // Find category for this slot
      for (const category of Object.values(categoryRegistry)) {
        const catValue = category.values.find(v => v.value === value);
        if (catValue) {
          catValue.tags.forEach(t => tags.add(t));
          break;
        }
      }
    }

    return Array.from(tags);
  }

  /**
   * Reset the factory state
   */
  reset(): void {
    this.diversityScorer.reset();
  }
}

export default PromptFactory;
