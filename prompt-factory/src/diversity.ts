/**
 * DIVERSITY SCORING SYSTEM
 * 
 * Measures and optimizes prompt diversity across multiple dimensions:
 * - Lexical (word choice, vocabulary breadth)
 * - Semantic (meaning, conceptual variety)
 * - Structural (format, organization)
 * - Intensity (emotional weight, dramatic arc)
 * - Categorical (template/category combinations)
 */

export interface DiversityScore {
  overall: number;
  dimensions: DimensionScores;
  analysis: DiversityAnalysis;
  recommendations: string[];
}

export interface DimensionScores {
  lexical: number;
  semantic: number;
  structural: number;
  intensity: number;
  categorical: number;
}

export interface DiversityAnalysis {
  uniqueWordRatio: number;
  categoryCoverage: number;
  intensityDistribution: IntensityDistribution;
  templateUtilization: Record<string, number>;
  tagDiversity: number;
}

export interface IntensityDistribution {
  subtle: number;
  moderate: number;
  intense: number;
  balance: number; // 0-1, higher = more even distribution
}

export interface PromptDiversity {
  id: string;
  prompt: string;
  template: string;
  categories: Record<string, string>;
  intensity: 'subtle' | 'moderate' | 'intense';
  tags: string[];
}

// ═══════════════════════════════════════════════════════════════
// DIVERSITY CALCULATOR
// ═══════════════════════════════════════════════════════════════

export class DiversityScorer {
  private prompts: PromptDiversity[] = [];

  addPrompt(prompt: PromptDiversity): void {
    this.prompts.push(prompt);
  }

  addPrompts(prompts: PromptDiversity[]): void {
    this.prompts.push(...prompts);
  }

  /**
   * Calculate comprehensive diversity score for current prompt set
   */
  calculateScore(): DiversityScore {
    if (this.prompts.length === 0) {
      return this.emptyScore();
    }

    const lexical = this.calculateLexicalDiversity();
    const semantic = this.calculateSemanticDiversity();
    const structural = this.calculateStructuralDiversity();
    const intensity = this.calculateIntensityDiversity();
    const categorical = this.calculateCategoricalDiversity();

    const dimensions: DimensionScores = {
      lexical,
      semantic,
      structural,
      intensity,
      categorical
    };

    const overall = this.weightedAverage(dimensions);
    const analysis = this.generateAnalysis();
    const recommendations = this.generateRecommendations(dimensions, analysis);

    return {
      overall,
      dimensions,
      analysis,
      recommendations
    };
  }

  /**
   * Lexical diversity: ratio of unique words to total words
   */
  private calculateLexicalDiversity(): number {
    const allText = this.prompts.map(p => p.prompt.toLowerCase()).join(' ');
    const words = allText.match(/\b[a-z]+\b/g) || [];
    const uniqueWords = new Set(words);
    
    // Type-Token Ratio (TTR) with normalization
    const ttr = uniqueWords.size / words.length;
    
    // Boost for vocabulary breadth across prompts
    const promptVocabularies = this.prompts.map(p => {
      const ws = p.prompt.toLowerCase().match(/\b[a-z]+\b/g) || [];
      return new Set(ws);
    });
    
    let overlapPenalty = 0;
    for (let i = 0; i < promptVocabularies.length; i++) {
      for (let j = i + 1; j < promptVocabularies.length; j++) {
        const intersection = new Set([...promptVocabularies[i]].filter(x => 
          promptVocabularies[j].has(x)
        ));
        const union = new Set([...promptVocabularies[i], ...promptVocabularies[j]]);
        const jaccard = intersection.size / union.size;
        overlapPenalty += jaccard;
      }
    }
    
    const pairs = (promptVocabularies.length * (promptVocabularies.length - 1)) / 2;
    const avgOverlap = pairs > 0 ? overlapPenalty / pairs : 0;
    
    // Higher TTR + lower overlap = better diversity
    return Math.min(1, (ttr * 0.6) + ((1 - avgOverlap) * 0.4));
  }

  /**
   * Semantic diversity: variety of concepts and themes
   */
  private calculateSemanticDiversity(): number {
    // Collect all tags and their frequencies
    const tagCounts = new Map<string, number>();
    const allTags: string[] = [];
    
    for (const prompt of this.prompts) {
      for (const tag of prompt.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        allTags.push(tag);
      }
    }

    // Calculate entropy of tag distribution
    const totalTags = allTags.length;
    let entropy = 0;
    
    for (const count of tagCounts.values()) {
      const probability = count / totalTags;
      entropy -= probability * Math.log2(probability);
    }

    // Normalize entropy (max is log2 of unique tags)
    const maxEntropy = Math.log2(tagCounts.size || 1);
    const normalizedEntropy = maxEntropy > 0 ? entropy / maxEntropy : 0;

    // Unique tag ratio
    const uniqueTagRatio = tagCounts.size / totalTags;

    return (normalizedEntropy * 0.7) + (uniqueTagRatio * 0.3);
  }

  /**
   * Structural diversity: variety in template usage
   */
  private calculateStructuralDiversity(): number {
    const templateCounts = new Map<string, number>();
    
    for (const prompt of this.prompts) {
      templateCounts.set(prompt.template, (templateCounts.get(prompt.template) || 0) + 1);
    }

    // Calculate evenness of template distribution
    const total = this.prompts.length;
    let evenness = 0;
    
    for (const count of templateCounts.values()) {
      const proportion = count / total;
      evenness -= proportion * Math.log2(proportion);
    }

    const maxEvenness = Math.log2(templateCounts.size || 1);
    return maxEvenness > 0 ? evenness / maxEvenness : 0;
  }

  /**
   * Intensity diversity: balanced distribution of intensity levels
   */
  private calculateIntensityDiversity(): number {
    const counts = {
      subtle: 0,
      moderate: 0,
      intense: 0
    };

    for (const prompt of this.prompts) {
      counts[prompt.intensity]++;
    }

    const total = this.prompts.length;
    const proportions = {
      subtle: counts.subtle / total,
      moderate: counts.moderate / total,
      intense: counts.intense / total
    };

    // Ideal distribution: 20% subtle, 50% moderate, 30% intense
    const ideal = { subtle: 0.2, moderate: 0.5, intense: 0.3 };
    
    // Calculate deviation from ideal
    const deviations = [
      Math.abs(proportions.subtle - ideal.subtle),
      Math.abs(proportions.moderate - ideal.moderate),
      Math.abs(proportions.intense - ideal.intense)
    ];

    const avgDeviation = deviations.reduce((a, b) => a + b, 0) / 3;
    return Math.max(0, 1 - avgDeviation * 2);
  }

  /**
   * Categorical diversity: coverage of category values
   */
  private calculateCategoricalDiversity(): number {
    const categoryUsage = new Map<string, Set<string>>();
    
    for (const prompt of this.prompts) {
      for (const [category, value] of Object.entries(prompt.categories)) {
        if (!categoryUsage.has(category)) {
          categoryUsage.set(category, new Set());
        }
        categoryUsage.get(category)!.add(value);
      }
    }

    // Calculate average coverage ratio across categories
    let totalCoverage = 0;
    let categoryCount = 0;

    for (const [category, used] of categoryUsage) {
      // We expect to see different values for each category
      // More unique values = better diversity
      const uniqueRatio = used.size / this.prompts.length;
      totalCoverage += Math.min(1, uniqueRatio * 2); // Cap at 1
      categoryCount++;
    }

    return categoryCount > 0 ? totalCoverage / categoryCount : 0;
  }

  /**
   * Generate comprehensive analysis
   */
  private generateAnalysis(): DiversityAnalysis {
    const allText = this.prompts.map(p => p.prompt).join(' ');
    const words = allText.match(/\b[a-z]+\b/gi) || [];
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));

    // Category coverage
    const categoryValues = new Set<string>();
    for (const prompt of this.prompts) {
      for (const value of Object.values(prompt.categories)) {
        categoryValues.add(value);
      }
    }

    // Intensity distribution
    const intensityDist = { subtle: 0, moderate: 0, intense: 0 };
    for (const prompt of this.prompts) {
      intensityDist[prompt.intensity]++;
    }
    
    const total = this.prompts.length;
    const dist = {
      subtle: intensityDist.subtle / total,
      moderate: intensityDist.moderate / total,
      intense: intensityDist.intense / total,
      balance: 1 - (Math.abs(intensityDist.subtle - intensityDist.intense) / total)
    };

    // Template utilization
    const templateUsage: Record<string, number> = {};
    for (const prompt of this.prompts) {
      templateUsage[prompt.template] = (templateUsage[prompt.template] || 0) + 1;
    }

    // Tag diversity
    const allTags = this.prompts.flatMap(p => p.tags);
    const uniqueTags = new Set(allTags);
    const tagDiversity = uniqueTags.size / allTags.length;

    return {
      uniqueWordRatio: uniqueWords.size / words.length,
      categoryCoverage: categoryValues.size / this.prompts.length,
      intensityDistribution: dist,
      templateUtilization: templateUsage,
      tagDiversity
    };
  }

  /**
   * Generate improvement recommendations
   */
  private generateRecommendations(dimensions: DimensionScores, analysis: DiversityAnalysis): string[] {
    const recommendations: string[] = [];

    if (dimensions.lexical < 0.5) {
      recommendations.push('Increase vocabulary variation: more synonyms, less template repetition');
    }

    if (dimensions.semantic < 0.5) {
      recommendations.push('Expand thematic range: explore underused tag categories');
    }

    if (dimensions.structural < 0.6) {
      const underused = Object.entries(analysis.templateUtilization)
        .filter(([, count]) => count < 2)
        .map(([name]) => name);
      if (underused.length > 0) {
        recommendations.push(`Increase use of underused templates: ${underused.slice(0, 3).join(', ')}`);
      }
    }

    if (analysis.intensityDistribution.subtle < 0.15) {
      recommendations.push('Add more subtle intensity prompts for balance');
    }

    if (analysis.intensityDistribution.intense < 0.2) {
      recommendations.push('Increase intense prompts for dramatic range');
    }

    if (dimensions.categorical < 0.5) {
      recommendations.push('Explore more category values: current selection is narrow');
    }

    if (analysis.tagDiversity < 0.3) {
      recommendations.push('Increase tag diversity: prompts share too many common tags');
    }

    return recommendations;
  }

  /**
   * Weighted average of dimension scores
   */
  private weightedAverage(dimensions: DimensionScores): number {
    const weights = {
      lexical: 0.20,
      semantic: 0.25,
      structural: 0.20,
      intensity: 0.15,
      categorical: 0.20
    };

    let weightedSum = 0;
    let totalWeight = 0;

    for (const [key, score] of Object.entries(dimensions)) {
      const weight = weights[key as keyof typeof weights];
      weightedSum += score * weight;
      totalWeight += weight;
    }

    return weightedSum / totalWeight;
  }

  /**
   * Empty score for no prompts
   */
  private emptyScore(): DiversityScore {
    return {
      overall: 0,
      dimensions: {
        lexical: 0,
        semantic: 0,
        structural: 0,
        intensity: 0,
        categorical: 0
      },
      analysis: {
        uniqueWordRatio: 0,
        categoryCoverage: 0,
        intensityDistribution: {
          subtle: 0,
          moderate: 0,
          intense: 0,
          balance: 0
        },
        templateUtilization: {},
        tagDiversity: 0
      },
      recommendations: ['Add prompts to calculate diversity scores']
    };
  }

  /**
   * Reset the scorer
   */
  reset(): void {
    this.prompts = [];
  }

  /**
   * Get current prompt count
   */
  getCount(): number {
    return this.prompts.length;
  }

  /**
   * Export prompts for external use
   */
  exportPrompts(): PromptDiversity[] {
    return [...this.prompts];
  }
}

// ═══════════════════════════════════════════════════════════════
// DIVERSITY TARGETS
// ═══════════════════════════════════════════════════════════════

export const DiversityTargets = {
  MINIMUM_ACCEPTABLE: 0.5,
  GOOD: 0.7,
  EXCELLENT: 0.85,
  IDEAL_DISTRIBUTION: {
    subtle: 0.20,
    moderate: 0.50,
    intense: 0.30
  }
};

export default DiversityScorer;
