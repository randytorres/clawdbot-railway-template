/**
 * PROMPT FACTORY - Main Export
 * 
 * Library entry point for programmatic use
 */

export { PromptFactory, GenerationConfig, GeneratedPrompt, GenerationResult } from './engine';
export { promptTemplates, PromptTemplate, TemplateSlot } from './templates';
export { 
  categoryRegistry, 
  getTotalCategoryValues, 
  getCategoryNames,
  CategoryBank,
  CategoryValue 
} from './categories';
export { 
  StyleInjector, 
  ACBrandProfile, 
  BrandStyleProfile,
  StyleValidation, 
  StyleViolation 
} from './brand';
export { 
  DiversityScorer, 
  DiversityScore, 
  DimensionScores,
  PromptDiversity, 
  DiversityTargets 
} from './diversity';

// Version
export const VERSION = '1.2.0';

// Imports for default export object
import { promptTemplates } from './templates';
import { PromptFactory } from './engine';
import { categoryRegistry } from './categories';
import { ACBrandProfile } from './brand';

export function createFactory(): PromptFactory {
  return new PromptFactory(promptTemplates);
}

export default {
  VERSION,
  createFactory,
  promptTemplates,
  categoryRegistry,
  ACBrandProfile
};
