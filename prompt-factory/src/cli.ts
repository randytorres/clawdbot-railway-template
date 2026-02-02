/**
 * PROMPT FACTORY CLI
 * 
 * Command-line interface for generating prompts
 */

import { PromptFactory } from './engine';
import { promptTemplates } from './templates';
import { getTotalCategoryValues, getCategoryNames } from './categories';

interface CLIOptions {
  count: number;
  output: string;
  format: 'json' | 'markdown';
  templates?: string[];
  enforceBrand: boolean;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {
    count: 100,
    output: './output/prompts',
    format: 'json',
    enforceBrand: true
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '-c':
      case '--count':
        options.count = parseInt(args[++i], 10);
        break;
      case '-o':
      case '--output':
        options.output = args[++i];
        break;
      case '-f':
      case '--format':
        options.format = args[++i] as 'json' | 'markdown';
        break;
      case '-t':
      case '--templates':
        options.templates = args[++i].split(',');
        break;
      case '--no-brand':
        options.enforceBrand = false;
        break;
      case '-h':
      case '--help':
        showHelp();
        process.exit(0);
    }
  }

  return options;
}

function showHelp(): void {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║              PROMPT FACTORY v1.2.0 - CLI                     ║
║              Loki × Friday | AC Brand System                 ║
╚══════════════════════════════════════════════════════════════╝

USAGE:
  ts-node cli.ts [OPTIONS]

OPTIONS:
  -c, --count <n>       Number of prompts to generate (default: 100)
  -o, --output <path>   Output file path (default: ./output/prompts)
  -f, --format <type>   Output format: json | markdown (default: json)
  -t, --templates <list> Comma-separated template IDs to use
  --no-brand            Disable brand style enforcement
  -h, --help            Show this help message

EXAMPLES:
  ts-node cli.ts --count 50 --format markdown
  ts-node cli.ts -c 200 -o ./custom/prompts -f json
  ts-node cli.ts -t product-desc,brand-voice --count 25

TEMPLATES:
  ${promptTemplates.map(t => `  ${t.id.padEnd(20)} - ${t.name}`).join('\n  ')}
`);
}

function formatAsMarkdown(prompts: any[], diversity: any): string {
  const timestamp = new Date().toISOString();
  
  let md = `# Prompt Factory Output v1.2.0

**Generated:** ${timestamp}
**Total Prompts:** ${prompts.length}
**Diversity Score:** ${(diversity.overall * 100).toFixed(1)}%

---

## Diversity Analysis

| Dimension | Score |
|-----------|-------|
| Lexical | ${(diversity.dimensions.lexical * 100).toFixed(1)}% |
| Semantic | ${(diversity.dimensions.semantic * 100).toFixed(1)}% |
| Structural | ${(diversity.dimensions.structural * 100).toFixed(1)}% |
| Intensity | ${(diversity.dimensions.intensity * 100).toFixed(1)}% |
| Categorical | ${(diversity.dimensions.categorical * 100).toFixed(1)}% |

---

`;

  prompts.forEach((p, i) => {
    md += `## Prompt ${i + 1}: ${p.template}

**ID:** ${p.id}  
**Intensity:** ${p.intensity}  
**Brand Score:** ${(p.brandValidation.score * 100).toFixed(1)}%  
**Tags:** ${p.tags.join(', ')}

### Generated Prompt

${p.prompt}

### Categories Used

${Object.entries(p.categories).map(([k, v]) => `- **${k}:** ${v}`).join('\n')}

---

`;
  });

  return md;
}

async function main(): Promise<void> {
  const options = parseArgs();

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║              PROMPT FACTORY v1.2.0                           ║
║              Loki × Friday | AC Brand System                 ║
╚══════════════════════════════════════════════════════════════╝
`);

  console.log('Configuration:');
  console.log(`  Target count:     ${options.count}`);
  console.log(`  Output format:    ${options.format}`);
  console.log(`  Brand enforcement: ${options.enforceBrand ? 'ON' : 'OFF'}`);
  console.log(`  Templates:        ${options.templates?.join(', ') || 'ALL'}`);
  console.log();

  console.log('Category Inventory:');
  console.log(`  Categories:       ${getCategoryNames().length}`);
  console.log(`  Total values:     ${getTotalCategoryValues()}`);
  console.log();

  console.log('Generating prompts via combinatorial expansion...\n');

  const factory = new PromptFactory(promptTemplates);
  const result = factory.generate({
    targetCount: options.count,
    templates: options.templates,
    enforceBrandStyle: options.enforceBrand,
    outputFormat: options.format
  });

  console.log('\n✓ Generation complete!\n');
  console.log('Statistics:');
  console.log(`  Generated:        ${result.stats.totalGenerated}/${result.stats.totalAttempted}`);
  console.log(`  Success rate:     ${((result.stats.totalGenerated / result.stats.totalAttempted) * 100).toFixed(1)}%`);
  console.log(`  Generation time:  ${result.stats.generationTime}ms`);
  console.log(`  Brand violations: ${result.stats.brandViolations}`);
  console.log();

  console.log('Diversity Score:');
  console.log(`  Overall:          ${(result.diversityScore.overall * 100).toFixed(1)}%`);
  console.log(`  Lexical:          ${(result.diversityScore.dimensions.lexical * 100).toFixed(1)}%`);
  console.log(`  Semantic:         ${(result.diversityScore.dimensions.semantic * 100).toFixed(1)}%`);
  console.log(`  Structural:       ${(result.diversityScore.dimensions.structural * 100).toFixed(1)}%`);
  console.log(`  Intensity:        ${(result.diversityScore.dimensions.intensity * 100).toFixed(1)}%`);
  console.log(`  Categorical:      ${(result.diversityScore.dimensions.categorical * 100).toFixed(1)}%`);
  console.log();

  console.log('Template Distribution:');
  for (const [template, count] of Object.entries(result.stats.templateDistribution)) {
    const percentage = ((count / result.stats.totalGenerated) * 100).toFixed(1);
    console.log(`  ${template.padEnd(20)} ${count.toString().padStart(3)} (${percentage}%)`);
  }
  console.log();

  if (result.diversityScore.recommendations.length > 0) {
    console.log('Recommendations:');
    result.diversityScore.recommendations.forEach(r => console.log(`  • ${r}`));
    console.log();
  }

  // Write output
  const fs = require('fs');
  const path = require('path');
  
  const outputDir = path.dirname(options.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = `${options.output}.${options.format}`;
  
  if (options.format === 'json') {
    fs.writeFileSync(outputPath, JSON.stringify({
      version: '1.2.0',
      generatedAt: new Date().toISOString(),
      stats: result.stats,
      diversity: result.diversityScore,
      prompts: result.prompts
    }, null, 2));
  } else {
    fs.writeFileSync(outputPath, formatAsMarkdown(result.prompts, result.diversityScore));
  }

  console.log(`✓ Output written to: ${outputPath}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
