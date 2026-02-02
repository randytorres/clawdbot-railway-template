/**
 * CATEGORY BANKS - Combinatorial Expansion Matrix
 * 
 * Each category contains values that populate template slots.
 * Diversity is achieved by combining templates with different
 * category selections across multiple dimensions.
 */

export interface CategoryBank {
  name: string;
  values: CategoryValue[];
  metadata: {
    source: string;
    culturalNotes?: string;
    intensity: 'subtle' | 'moderate' | 'intense';
  };
}

export interface CategoryValue {
  id: string;
  value: string;
  tags: string[];
  weight: number; // 0-1, probability weight for selection
  intensity: 'subtle' | 'moderate' | 'intense';
}

// ═══════════════════════════════════════════════════════════════
// PRODUCT & EXPERIENCE CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const productTypes: CategoryBank = {
  name: 'product_types',
  values: [
    { id: 'pt1', value: 'limited release cultivar', tags: ['cannabis', 'exclusive', 'flower'], weight: 1.0, intensity: 'moderate' },
    { id: 'pt2', value: 'single-origin concentrate', tags: ['cannabis', 'extraction', 'premium'], weight: 1.0, intensity: 'moderate' },
    { id: 'pt3', value: 'heritage preroll', tags: ['cannabis', 'heritage', 'convenience'], weight: 0.9, intensity: 'moderate' },
    { id: 'pt4', value: 'small-batch infusion', tags: ['cannabis', 'edible', 'craft'], weight: 0.9, intensity: 'moderate' },
    { id: 'pt5', value: 'collector vaporizer', tags: ['hardware', 'luxury', 'tech'], weight: 0.8, intensity: 'intense' },
    { id: 'pt6', value: 'ceremonial accessory', tags: ['lifestyle', 'ritual', 'object'], weight: 0.8, intensity: 'intense' },
    { id: 'pt7', value: 'apparel piece', tags: ['fashion', 'streetwear', 'identity'], weight: 0.7, intensity: 'moderate' },
    { id: 'pt8', value: 'membership artifact', tags: ['access', 'exclusive', 'identity'], weight: 0.8, intensity: 'intense' },
    { id: 'pt9', value: 'seasonal release', tags: ['cannabis', 'time-bound', 'rare'], weight: 0.9, intensity: 'moderate' },
    { id: 'pt10', value: 'legacy strain', tags: ['cannabis', 'heritage', 'landrace'], weight: 1.0, intensity: 'intense' },
    { id: 'pt11', value: 'artisan topical', tags: ['wellness', 'craft', 'body'], weight: 0.6, intensity: 'subtle' },
    { id: 'pt12', value: 'curated sampler', tags: ['discovery', 'variety', 'gift'], weight: 0.7, intensity: 'moderate' },
  ],
  metadata: { source: 'AC product taxonomy', intensity: 'moderate' }
};

export const moods: CategoryBank = {
  name: 'moods',
  values: [
    { id: 'm1', value: 'reverent anticipation', tags: ['emotional', 'ceremony', 'respect'], weight: 1.0, intensity: 'intense' },
    { id: 'm2', value: 'focused intensity', tags: ['mental', 'work', 'clarity'], weight: 0.9, intensity: 'moderate' },
    { id: 'm3', value: 'contemplative solitude', tags: ['emotional', 'alone', 'reflective'], weight: 0.9, intensity: 'moderate' },
    { id: 'm4', value: 'creative emergence', tags: ['mental', 'art', 'expression'], weight: 0.9, intensity: 'moderate' },
    { id: 'm5', value: 'social elevation', tags: ['social', 'gathering', 'connection'], weight: 0.8, intensity: 'moderate' },
    { id: 'm6', value: 'restorative stillness', tags: ['physical', 'rest', 'recovery'], weight: 0.8, intensity: 'subtle' },
    { id: 'm7', value: 'sensory heightening', tags: ['physical', 'perception', 'awareness'], weight: 0.9, intensity: 'moderate' },
    { id: 'm8', value: 'ancestral connection', tags: ['spiritual', 'heritage', 'lineage'], weight: 1.0, intensity: 'intense' },
    { id: 'm9', value: 'confident presence', tags: ['social', 'leadership', 'assertion'], weight: 0.8, intensity: 'moderate' },
    { id: 'm10', value: 'playful exploration', tags: ['mental', 'curiosity', 'discovery'], weight: 0.7, intensity: 'subtle' },
    { id: 'm11', value: 'deep listening', tags: ['social', 'empathy', 'attention'], weight: 0.8, intensity: 'subtle' },
    { id: 'm12', value: 'nocturnal vigilance', tags: ['temporal', 'night', 'watchfulness'], weight: 0.8, intensity: 'intense' },
    { id: 'm13', value: 'dawn clarity', tags: ['temporal', 'morning', 'freshness'], weight: 0.7, intensity: 'subtle' },
    { id: 'm14', value: 'predatory focus', tags: ['mental', 'hunt', 'pursuit'], weight: 0.9, intensity: 'intense' },
    { id: 'm15', value: 'sacred witness', tags: ['spiritual', 'observation', 'presence'], weight: 0.9, intensity: 'intense' },
  ],
  metadata: { source: 'Emotional mapping study', intensity: 'moderate' }
};

export const aesthetics: CategoryBank = {
  name: 'aesthetics',
  values: [
    { id: 'a1', value: 'obsidian minimalism', tags: ['visual', 'dark', 'clean'], weight: 1.0, intensity: 'intense' },
    { id: 'a2', value: 'brutalist architecture', tags: ['visual', 'concrete', 'strength'], weight: 0.9, intensity: 'moderate' },
    { id: 'a3', value: 'temple geometry', tags: ['visual', 'sacred', 'pattern'], weight: 1.0, intensity: 'intense' },
    { id: 'a4', value: 'desert noir', tags: ['visual', 'landscape', 'mystery'], weight: 0.9, intensity: 'moderate' },
    { id: 'a5', value: 'jungle cathedral', tags: ['visual', 'nature', 'overwhelming'], weight: 0.8, intensity: 'intense' },
    { id: 'a6', value: 'lunar silver', tags: ['visual', 'celestial', 'cool'], weight: 0.8, intensity: 'subtle' },
    { id: 'a7', value: 'volcanic earth', tags: ['visual', 'elemental', 'power'], weight: 0.9, intensity: 'intense' },
    { id: 'a8', value: 'weathered leather', tags: ['tactile', 'age', 'patina'], weight: 0.8, intensity: 'moderate' },
    { id: 'a9', value: 'polished bronze', tags: ['visual', 'metal', 'refinement'], weight: 0.8, intensity: 'moderate' },
    { id: 'a10', value: 'blood-orange dusk', tags: ['visual', 'color', 'transition'], weight: 0.8, intensity: 'moderate' },
    { id: 'a11', value: 'marble veining', tags: ['visual', 'stone', 'organic'], weight: 0.7, intensity: 'subtle' },
    { id: 'a12', value: 'smoke and shadow', tags: ['visual', 'ephemeral', 'mystery'], weight: 0.9, intensity: 'intense' },
    { id: 'a13', value: 'golden proportion', tags: ['visual', 'math', 'harmony'], weight: 0.7, intensity: 'subtle' },
    { id: 'a14', value: 'worn silk', tags: ['tactile', 'luxury', 'time'], weight: 0.7, intensity: 'subtle' },
    { id: 'a15', value: 'rain on concrete', tags: ['auditory', 'urban', 'melancholy'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Visual identity system', intensity: 'intense' }
};

export const audiences: CategoryBank = {
  name: 'audiences',
  values: [
    { id: 'au1', value: 'the discerning cultivator', tags: ['expert', 'grower', 'technical'], weight: 1.0, intensity: 'moderate' },
    { id: 'au2', value: 'the seasoned connoisseur', tags: ['expert', 'consumer', 'refined'], weight: 1.0, intensity: 'moderate' },
    { id: 'au3', value: 'the curious initiate', tags: ['newcomer', 'learning', 'open'], weight: 0.9, intensity: 'subtle' },
    { id: 'au4', value: 'the creative practitioner', tags: ['artist', 'maker', 'expressive'], weight: 0.9, intensity: 'moderate' },
    { id: 'au5', value: 'the wellness seeker', tags: ['health', 'balance', 'intentional'], weight: 0.8, intensity: 'subtle' },
    { id: 'au6', value: 'the social architect', tags: ['host', 'gatherer', 'connector'], weight: 0.8, intensity: 'moderate' },
    { id: 'au7', value: 'the legacy holder', tags: ['heritage', 'family', 'tradition'], weight: 0.9, intensity: 'intense' },
    { id: 'au8', value: 'the boundary crosser', tags: ['explorer', 'risk-taker', 'pioneer'], weight: 0.8, intensity: 'intense' },
    { id: 'au9', value: 'the quiet observer', tags: ['introvert', 'analytical', 'patient'], weight: 0.8, intensity: 'subtle' },
    { id: 'au10', value: 'the ritual keeper', tags: ['ceremony', 'practice', 'discipline'], weight: 0.9, intensity: 'intense' },
    { id: 'au11', value: 'the quality obsessive', tags: ['perfectionist', 'details', 'discerning'], weight: 0.9, intensity: 'moderate' },
    { id: 'au12', value: 'the story collector', tags: ['narrative', 'history', 'meaning'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Audience segmentation study', intensity: 'moderate' }
};

export const rituals: CategoryBank = {
  name: 'rituals',
  values: [
    { id: 'r1', value: 'Frame this as preparation for significant work', tags: ['intention', 'productivity'], weight: 1.0, intensity: 'moderate' },
    { id: 'r2', value: 'Position as transition from public to private self', tags: ['identity', 'boundary'], weight: 0.9, intensity: 'moderate' },
    { id: 'r3', value: 'Present as communion with lineage', tags: ['heritage', 'ancestors'], weight: 1.0, intensity: 'intense' },
    { id: 'r4', value: 'Describe as sensory calibration ritual', tags: ['perception', 'awareness'], weight: 0.9, intensity: 'moderate' },
    { id: 'r5', value: 'Cast as creative invocation practice', tags: ['art', 'inspiration'], weight: 0.9, intensity: 'moderate' },
    { id: 'r6', value: 'Frame as restoration protocol', tags: ['recovery', 'self-care'], weight: 0.8, intensity: 'subtle' },
    { id: 'r7', value: 'Position as social bonding ceremony', tags: ['connection', 'community'], weight: 0.8, intensity: 'moderate' },
    { id: 'r8', value: 'Present as contemplative practice', tags: ['meditation', 'reflection'], weight: 0.9, intensity: 'subtle' },
    { id: 'r9', value: 'Describe as mark of accomplished day', tags: ['reward', 'completion'], weight: 0.8, intensity: 'subtle' },
    { id: 'r10', value: 'Cast as gateway to altered perception', tags: ['consciousness', 'exploration'], weight: 0.9, intensity: 'intense' },
  ],
  metadata: { source: 'Ritual usage research', intensity: 'moderate' }
};

// ═══════════════════════════════════════════════════════════════
// MYTHOLOGICAL & ARCHETYPAL CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const archetypes: CategoryBank = {
  name: 'archetypes',
  values: [
    { id: 'ar1', value: 'The Sentinel', tags: ['protector', 'vigil', 'boundary'], weight: 1.0, intensity: 'intense' },
    { id: 'ar2', value: 'The Alchemist', tags: ['transformation', 'knowledge', 'craft'], weight: 1.0, intensity: 'intense' },
    { id: 'ar3', value: 'The Cartographer', tags: ['exploration', 'mapping', 'discovery'], weight: 0.9, intensity: 'moderate' },
    { id: 'ar4', value: 'The Archivist', tags: ['preservation', 'memory', 'lineage'], weight: 0.9, intensity: 'moderate' },
    { id: 'ar5', value: 'The Architect', tags: ['design', 'structure', 'vision'], weight: 0.9, intensity: 'moderate' },
    { id: 'ar6', value: 'The Keeper of Keys', tags: ['access', 'gatekeeping', 'trust'], weight: 0.9, intensity: 'intense' },
    { id: 'ar7', value: 'The Witness', tags: ['observation', 'truth', 'presence'], weight: 0.8, intensity: 'subtle' },
    { id: 'ar8', value: 'The Navigator', tags: ['guidance', 'direction', 'stars'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Archetypal analysis', intensity: 'intense' }
};

export const contrasts: CategoryBank = {
  name: 'contrasts',
  values: [
    { id: 'c1', value: 'ancient technique × modern precision', tags: ['time', 'technology'], weight: 1.0, intensity: 'moderate' },
    { id: 'c2', value: 'violent intensity × meditative calm', tags: ['energy', 'duality'], weight: 0.9, intensity: 'intense' },
    { id: 'c3', value: 'exclusive access × democratic craft', tags: ['access', 'equality'], weight: 0.9, intensity: 'moderate' },
    { id: 'c4', value: 'street grit × temple reverence', tags: ['origin', 'elevation'], weight: 1.0, intensity: 'intense' },
    { id: 'c5', value: 'personal ritual × collective experience', tags: ['individual', 'group'], weight: 0.9, intensity: 'moderate' },
    { id: 'c6', value: 'scientific rigor × spiritual intuition', tags: ['mind', 'spirit'], weight: 0.9, intensity: 'moderate' },
    { id: 'c7', value: 'visible product × hidden process', tags: ['surface', 'depth'], weight: 0.8, intensity: 'moderate' },
    { id: 'c8', value: 'immaculate presentation × raw materials', tags: ['finish', 'origin'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Brand tension analysis', intensity: 'moderate' }
};

export const origins: CategoryBank = {
  name: 'origins',
  values: [
    { id: 'o1', value: 'Mesoamerican', tags: ['aztec', 'maya', 'olmec', 'ancient'], weight: 1.0, intensity: 'intense' },
    { id: 'o2', value: 'Andean', tags: ['inca', 'mountain', 'elevation'], weight: 0.9, intensity: 'moderate' },
    { id: 'o3', value: 'East Asian', tags: ['tao', 'zen', 'harmony'], weight: 0.8, intensity: 'subtle' },
    { id: 'o4', value: 'Nordic', tags: ['viking', 'runes', 'cold'], weight: 0.8, intensity: 'moderate' },
    { id: 'o5', value: 'Mediterranean', tags: ['olive', 'wine', 'ancient'], weight: 0.8, intensity: 'subtle' },
    { id: 'o6', value: 'Himalayan', tags: ['buddhist', 'elevation', 'spirit'], weight: 0.8, intensity: 'moderate' },
    { id: 'o7', value: 'North African', tags: ['desert', 'berber', 'stars'], weight: 0.8, intensity: 'moderate' },
    { id: 'o8', value: 'Polynesian', tags: ['ocean', 'navigation', 'wayfinding'], weight: 0.7, intensity: 'moderate' },
  ],
  metadata: { source: 'Cultural mythology audit', intensity: 'intense', culturalNotes: 'Respectful adaptation, not appropriation' }
};

// ═══════════════════════════════════════════════════════════════
// CAMPAIGN & NARRATIVE CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const artifacts: CategoryBank = {
  name: 'artifacts',
  values: [
    { id: 'af1', value: 'the Obsidian Blade', tags: ['weapon', 'sharp', 'purpose'], weight: 1.0, intensity: 'intense' },
    { id: 'af2', value: 'the Codex', tags: ['knowledge', 'secret', 'written'], weight: 0.9, intensity: 'intense' },
    { id: 'af3', value: 'the Vessel', tags: ['container', 'sacred', 'holding'], weight: 0.9, intensity: 'moderate' },
    { id: 'af4', value: 'the Compass', tags: ['direction', 'navigation', 'finding'], weight: 0.9, intensity: 'moderate' },
    { id: 'af5', value: 'the Key', tags: ['access', 'opening', 'exclusive'], weight: 0.9, intensity: 'moderate' },
    { id: 'af6', value: 'the Mask', tags: ['transformation', 'identity', 'reveal'], weight: 0.9, intensity: 'intense' },
    { id: 'af7', value: 'the Seed', tags: ['potential', 'growth', 'lineage'], weight: 0.8, intensity: 'subtle' },
    { id: 'af8', value: 'the Mirror', tags: ['reflection', 'truth', 'self'], weight: 0.8, intensity: 'moderate' },
    { id: 'af9', value: 'the Flame', tags: ['transformation', 'light', 'danger'], weight: 0.9, intensity: 'intense' },
    { id: 'af10', value: 'the Map', tags: ['territory', 'exploration', 'claiming'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Symbol library', intensity: 'intense' }
};

export const journeys: CategoryBank = {
  name: 'journeys',
  values: [
    { id: 'j1', value: 'Descent', tags: ['underworld', 'shadow', 'return'], weight: 1.0, intensity: 'intense' },
    { id: 'j2', value: 'Pilgrimage', tags: ['sacred', 'travel', 'transformation'], weight: 0.9, intensity: 'intense' },
    { id: 'j3', value: 'Initiation', tags: ['test', 'passage', 'admission'], weight: 1.0, intensity: 'intense' },
    { id: 'j4', value: 'Exodus', tags: ['departure', 'liberation', 'new land'], weight: 0.9, intensity: 'moderate' },
    { id: 'j5', value: 'Hunt', tags: ['pursuit', 'prey', 'instinct'], weight: 0.9, intensity: 'intense' },
    { id: 'j6', value: 'Return', tags: ['homecoming', 'wisdom', 'integration'], weight: 0.8, intensity: 'moderate' },
    { id: 'j7', value: 'Vision', tags: ['dream', 'prophecy', 'seeing'], weight: 0.8, intensity: 'moderate' },
    { id: 'j8', value: 'Forge', tags: ['creation', 'craft', 'trial'], weight: 0.9, intensity: 'moderate' },
  ],
  metadata: { source: 'Hero journey variants', intensity: 'intense' }
};

export const thresholds: CategoryBank = {
  name: 'thresholds',
  values: [
    { id: 't1', value: 'the Midnight Hour', tags: ['time', 'liminal', 'magic'], weight: 1.0, intensity: 'intense' },
    { id: 't2', value: 'the City Gate', tags: ['boundary', 'urban', 'entry'], weight: 0.9, intensity: 'moderate' },
    { id: 't3', value: 'the Mountain Pass', tags: ['elevation', 'test', 'view'], weight: 0.9, intensity: 'moderate' },
    { id: 't4', value: 'the Water\'s Edge', tags: ['shore', 'reflection', 'crossing'], weight: 0.9, intensity: 'subtle' },
    { id: 't5', value: 'the Forgotten Door', tags: ['hidden', 'secret', 'discovery'], weight: 0.9, intensity: 'intense' },
    { id: 't6', value: 'the Veil', tags: ['thin places', 'spirit', 'perception'], weight: 0.9, intensity: 'intense' },
    { id: 't7', value: 'the Crossroads', tags: ['choice', 'meeting', 'decision'], weight: 0.9, intensity: 'moderate' },
    { id: 't8', value: 'the Archive', tags: ['knowledge', 'preservation', 'access'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Liminal space taxonomy', intensity: 'intense' }
};

export const guardians: CategoryBank = {
  name: 'guardians',
  values: [
    { id: 'g1', value: 'A silent figure in obsidian robes', tags: ['mystery', 'silent', 'watching'], weight: 1.0, intensity: 'intense' },
    { id: 'g2', value: 'An ancient lock requiring specific knowledge', tags: ['puzzle', 'key', 'test'], weight: 0.9, intensity: 'moderate' },
    { id: 'g3', value: 'A biometric threshold', tags: ['tech', 'body', 'identity'], weight: 0.8, intensity: 'moderate' },
    { id: 'g4', value: 'A spoken password in a dead language', tags: ['voice', 'ancient', 'secret'], weight: 0.9, intensity: 'intense' },
    { id: 'g5', value: 'A physical token carried by few', tags: ['object', 'rare', 'credential'], weight: 0.9, intensity: 'moderate' },
    { id: 'g6', value: 'A question that must be answered truly', tags: ['truth', 'test', 'character'], weight: 0.9, intensity: 'intense' },
    { id: 'g7', value: 'A sum of resources that filters by commitment', tags: ['price', 'sacrifice', 'worth'], weight: 0.8, intensity: 'moderate' },
    { id: 'g8', value: 'No guardian—access finds the worthy', tags: ['merit', 'attraction', 'selection'], weight: 0.8, intensity: 'subtle' },
  ],
  metadata: { source: 'Access control metaphors', intensity: 'intense' }
};

// ═══════════════════════════════════════════════════════════════
// STRAIN & TERROIR CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const regions: CategoryBank = {
  name: 'regions',
  values: [
    { id: 're1', value: 'the Sierra Madre highlands', tags: ['mountain', 'mexico', 'elevation'], weight: 1.0, intensity: 'moderate' },
    { id: 're2', value: 'the Oaxacan cloud forests', tags: ['forest', 'mist', 'mystery'], weight: 0.9, intensity: 'intense' },
    { id: 're3', value: 'the Afghan Hindu Kush', tags: ['mountain', 'ancient', 'rugged'], weight: 1.0, intensity: 'intense' },
    { id: 're4', value: 'the Emerald Triangle', tags: ['california', 'legacy', 'fertile'], weight: 0.9, intensity: 'moderate' },
    { id: 're5', value: 'the Colombian mountains', tags: ['elevation', 'equatorial', 'rich'], weight: 0.9, intensity: 'moderate' },
    { id: 're6', value: 'the Nepalese valleys', tags: ['himalaya', 'spiritual', 'isolated'], weight: 0.9, intensity: 'moderate' },
    { id: 're7', value: 'the Thai highlands', tags: ['southeast', 'sativa', 'tropical'], weight: 0.8, intensity: 'moderate' },
    { id: 're8', value: 'the Moroccan Rif', tags: ['north', 'hashish', 'traditional'], weight: 0.9, intensity: 'moderate' },
  ],
  metadata: { source: 'Cannabis geography', intensity: 'moderate' }
};

export const elements: CategoryBank = {
  name: 'elements',
  values: [
    { id: 'e1', value: 'volcanic mineral deposits', tags: ['earth', 'fire', 'rich'], weight: 1.0, intensity: 'intense' },
    { id: 'e2', value: 'persistent mountain mist', tags: ['water', 'air', 'cool'], weight: 0.9, intensity: 'moderate' },
    { id: 'e3', value: 'intense equatorial sun', tags: ['fire', 'light', 'power'], weight: 0.9, intensity: 'moderate' },
    { id: 'e4', value: 'ancient river sediment', tags: ['water', 'earth', 'history'], weight: 0.9, intensity: 'moderate' },
    { id: 'e5', value: 'thin high-altitude air', tags: ['air', 'stress', 'character'], weight: 0.9, intensity: 'moderate' },
    { id: 'e6', value: 'diurnal temperature swings', tags: ['stress', 'resin', 'adaptation'], weight: 0.9, intensity: 'moderate' },
    { id: 'e7', value: 'coastal salt influence', tags: ['water', 'stress', 'unique'], weight: 0.8, intensity: 'subtle' },
    { id: 'e8', value: 'granite mountain substrate', tags: ['earth', 'drainage', 'mineral'], weight: 0.8, intensity: 'subtle' },
  ],
  metadata: { source: 'Terroir analysis', intensity: 'moderate' }
};

export const keepers: CategoryBank = {
  name: 'keepers',
  values: [
    { id: 'k1', value: 'a family whose name is synonymous with the region', tags: ['legacy', 'family', 'reputation'], weight: 1.0, intensity: 'intense' },
    { id: 'k2', value: 'an elder who speaks only in growing seasons', tags: ['time', 'wisdom', 'quiet'], weight: 0.9, intensity: 'intense' },
    { id: 'k3', value: 'a collective bound by oral tradition', tags: ['community', 'secret', 'transmission'], weight: 0.9, intensity: 'moderate' },
    { id: 'k4', value: 'a solitary cultivator on a terraced hillside', tags: ['isolation', 'dedication', 'craft'], weight: 0.9, intensity: 'moderate' },
    { id: 'k5', value: 'a guild that tests each generation', tags: ['hierarchy', 'merit', 'tradition'], weight: 0.9, intensity: 'intense' },
    { id: 'k6', value: 'a woman who inherited seeds and silence', tags: ['legacy', 'gender', 'mystery'], weight: 0.9, intensity: 'intense' },
    { id: 'k7', value: 'a monastery that has grown for centuries', tags: ['spiritual', 'time', 'dedication'], weight: 0.8, intensity: 'intense' },
    { id: 'k8', value: 'a network of keepers sharing cuttings in shadow', tags: ['underground', 'network', 'preservation'], weight: 0.9, intensity: 'intense' },
  ],
  metadata: { source: 'Lineage narratives', intensity: 'intense' }
};

export const markers: CategoryBank = {
  name: 'markers',
  values: [
    { id: 'ma1', value: 'silver trichomes against deep purple', tags: ['visual', 'color', 'quality'], weight: 1.0, intensity: 'moderate' },
    { id: 'ma2', value: 'a nose of diesel and ancient forest', tags: ['aroma', 'complex', 'terpene'], weight: 1.0, intensity: 'moderate' },
    { id: 'ma3', value: 'effects that arrive in distinct waves', tags: ['experience', 'temporal', 'unique'], weight: 0.9, intensity: 'moderate' },
    { id: 'ma4', value: 'a finish that lingers like incense', tags: ['duration', 'sensory', 'memory'], weight: 0.9, intensity: 'moderate' },
    { id: 'ma5', value: 'structural density that speaks to cure', tags: ['tactile', 'craft', 'quality'], weight: 0.9, intensity: 'subtle' },
    { id: 'ma6', value: 'a flavor arc from bright to shadow', tags: ['taste', 'journey', 'complex'], weight: 0.9, intensity: 'moderate' },
    { id: 'ma7', value: 'a reputation that precedes it across borders', tags: ['social', 'fame', 'demand'], weight: 0.8, intensity: 'intense' },
    { id: 'ma8', value: 'a genetic lineage traced to pre-prohibition', tags: ['history', 'authentic', 'rare'], weight: 0.9, intensity: 'intense' },
    { id: 'ma9', value: 'a flowering time that tests patience', tags: ['process', 'time', 'craft'], weight: 0.8, intensity: 'moderate' },
    { id: 'ma10', value: 'a terpene profile that defines its region', tags: ['science', 'place', 'identity'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Strain characteristics', intensity: 'moderate' }
};

// ═══════════════════════════════════════════════════════════════
// EVENT & SOCIAL CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const occasions: CategoryBank = {
  name: 'occasions',
  values: [
    { id: 'oc1', value: 'a solstice observance', tags: ['seasonal', 'astronomical', 'ancient'], weight: 1.0, intensity: 'intense' },
    { id: 'oc2', value: 'a harvest celebration', tags: ['agricultural', 'completion', 'abundance'], weight: 0.9, intensity: 'moderate' },
    { id: 'oc3', value: 'an initiation ceremony', tags: ['passage', 'exclusive', 'transformative'], weight: 1.0, intensity: 'intense' },
    { id: 'oc4', value: 'a new moon gathering', tags: ['lunar', 'cyclic', 'intention'], weight: 0.9, intensity: 'moderate' },
    { id: 'oc5', value: 'a commemoration of lineage', tags: ['ancestors', 'heritage', 'remembrance'], weight: 0.9, intensity: 'intense' },
    { id: 'oc6', value: 'a tasting of the rarest expressions', tags: ['exclusive', 'sensory', 'curated'], weight: 0.9, intensity: 'moderate' },
    { id: 'oc7', value: 'a fireside council', tags: ['intimate', 'wisdom', 'night'], weight: 0.9, intensity: 'moderate' },
    { id: 'oc8', value: 'an equinox balance ritual', tags: ['seasonal', 'equilibrium', 'transition'], weight: 0.8, intensity: 'subtle' },
  ],
  metadata: { source: 'Event typology', intensity: 'intense' }
};

export const assemblies: CategoryBank = {
  name: 'assemblies',
  values: [
    { id: 'as1', value: 'those who have completed the journey', tags: ['experienced', 'veteran', 'worthy'], weight: 1.0, intensity: 'intense' },
    { id: 'as2', value: 'keepers of the craft from five regions', tags: ['expert', 'diverse', 'respected'], weight: 0.9, intensity: 'intense' },
    { id: 'as3', value: 'the curious and the committed', tags: ['mixed', 'open', 'serious'], weight: 0.8, intensity: 'moderate' },
    { id: 'as4', value: 'twelve chosen for this season', tags: ['limited', 'selected', 'exclusive'], weight: 0.9, intensity: 'intense' },
    { id: 'as5', value: 'practitioners who work in shadow', tags: ['underground', 'serious', 'discreet'], weight: 0.9, intensity: 'intense' },
    { id: 'as6', value: 'collectors of rare expressions', tags: ['connoisseur', 'wealth', 'discerning'], weight: 0.8, intensity: 'moderate' },
    { id: 'as7', value: 'the next generation and their mentors', tags: ['legacy', 'transmission', 'continuity'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Audience framing', intensity: 'intense' }
};

export const credentials: CategoryBank = {
  name: 'credentials',
  values: [
    { id: 'cr1', value: 'a prior invitation', tags: ['network', 'existing', 'trust'], weight: 1.0, intensity: 'moderate' },
    { id: 'cr2', value: 'completion of the preparatory rites', tags: ['commitment', 'process', 'readiness'], weight: 0.9, intensity: 'intense' },
    { id: 'cr3', value: 'membership in the circle', tags: ['belonging', 'ongoing', 'identity'], weight: 0.9, intensity: 'moderate' },
    { id: 'cr4', value: 'a referral from one within', tags: ['trust', 'network', 'vetting'], weight: 0.9, intensity: 'moderate' },
    { id: 'cr5', value: 'demonstrated craft or contribution', tags: ['merit', 'skill', 'value'], weight: 0.9, intensity: 'moderate' },
    { id: 'cr6', value: 'possession of the seasonal token', tags: ['object', 'proof', 'access'], weight: 0.9, intensity: 'intense' },
    { id: 'cr7', value: 'a direct summons', tags: ['invitation', 'exclusive', 'rare'], weight: 0.8, intensity: 'intense' },
    { id: 'cr8', value: 'verification of identity and intent', tags: ['security', 'serious', 'screening'], weight: 0.8, intensity: 'moderate' },
  ],
  metadata: { source: 'Access requirements', intensity: 'moderate' }
};

export const prices: CategoryBank = {
  name: 'prices',
  values: [
    { id: 'pr1', value: 'The exchange is measured in attention, not currency.', tags: ['non-monetary', 'serious', 'commitment'], weight: 1.0, intensity: 'intense' },
    { id: 'pr2', value: 'Those who gather contribute according to capacity.', tags: ['sliding', 'communal', 'inclusive'], weight: 0.8, intensity: 'moderate' },
    { id: 'pr3', value: 'A fixed offering that reflects the value within.', tags: ['monetary', 'clear', 'worth'], weight: 0.9, intensity: 'moderate' },
    { id: 'pr4', value: 'No exchange is requested—value flows differently here.', tags: ['gift', 'alternative', 'community'], weight: 0.8, intensity: 'subtle' },
    { id: 'pr5', value: '', tags: ['omitted', 'implied', 'mysterious'], weight: 0.7, intensity: 'subtle' },
  ],
  metadata: { source: 'Pricing narratives', intensity: 'subtle' }
};

// ═══════════════════════════════════════════════════════════════
// OUTREACH & BUSINESS CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const relations: CategoryBank = {
  name: 'relations',
  values: [
    { id: 'rl1', value: 'fellow practitioners of the craft', tags: ['peer', 'equal', 'respect'], weight: 1.0, intensity: 'moderate' },
    { id: 'rl2', value: 'stewards of complementary traditions', tags: ['ally', 'different', 'shared'], weight: 0.9, intensity: 'moderate' },
    { id: 'rl3', value: 'architects of similar visions', tags: ['builder', 'parallel', 'ambition'], weight: 0.9, intensity: 'moderate' },
    { id: 'rl4', value: 'keepers of adjacent territories', tags: ['neighbor', 'border', 'connection'], weight: 0.9, intensity: 'moderate' },
    { id: 'rl5', value: 'those who serve the same audience differently', tags: ['complementary', 'market', 'shared'], weight: 0.9, intensity: 'moderate' },
    { id: 'rl6', value: 'descendants of common lineage', tags: ['heritage', 'origin', 'connection'], weight: 0.8, intensity: 'intense' },
  ],
  metadata: { source: 'Partnership positioning', intensity: 'moderate' }
};

export const mutuals: CategoryBank = {
  name: 'mutuals',
  values: [
    { id: 'mu1', value: 'alignment on standards without compromise', tags: ['quality', 'shared', 'excellence'], weight: 1.0, intensity: 'moderate' },
    { id: 'mu2', value: 'expanded territory for both traditions', tags: ['growth', 'market', 'expansion'], weight: 0.9, intensity: 'moderate' },
    { id: 'mu3', value: 'collective defense of craft against commodification', tags: ['protection', 'values', 'mission'], weight: 1.0, intensity: 'intense' },
    { id: 'mu4', value: 'shared access to circles currently separate', tags: ['network', 'introduction', 'trust'], weight: 0.9, intensity: 'moderate' },
    { id: 'mu5', value: 'combined capacity for larger undertakings', tags: ['scale', 'capability', 'ambition'], weight: 0.9, intensity: 'moderate' },
    { id: 'mu6', value: 'preservation of knowledge through distribution', tags: ['legacy', 'education', 'continuity'], weight: 0.9, intensity: 'intense' },
  ],
  metadata: { source: 'Partnership value propositions', intensity: 'moderate' }
};

export const proofs: CategoryBank = {
  name: 'proofs',
  values: [
    { id: 'pf1', value: 'a track record visible to those who know where to look', tags: ['reputation', 'industry', 'subtle'], weight: 1.0, intensity: 'moderate' },
    { id: 'pf2', value: 'specific results for named allies', tags: ['case', 'referral', 'concrete'], weight: 0.9, intensity: 'moderate' },
    { id: 'pf3', value: 'artifacts that speak without explanation', tags: ['product', 'evidence', 'quality'], weight: 0.9, intensity: 'moderate' },
    { id: 'pf4', value: 'recognition from institutions that matter', tags: ['award', 'press', 'validation'], weight: 0.8, intensity: 'subtle' },
    { id: 'pf5', value: 'the duration and consistency of our practice', tags: ['time', 'survival', 'commitment'], weight: 0.9, intensity: 'moderate' },
    { id: 'pf6', value: 'testimony of those who vouch without prompting', tags: ['referral', 'organic', 'trust'], weight: 1.0, intensity: 'intense' },
  ],
  metadata: { source: 'Credibility indicators', intensity: 'moderate' }
};

// ═══════════════════════════════════════════════════════════════
// THOUGHT LEADERSHIP CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const domains: CategoryBank = {
  name: 'domains',
  values: [
    { id: 'do1', value: 'the future of craft in an automated world', tags: ['technology', 'craft', 'tension'], weight: 1.0, intensity: 'moderate' },
    { id: 'do2', value: 'terroir as a defensible moat', tags: ['place', 'business', 'strategy'], weight: 0.9, intensity: 'moderate' },
    { id: 'do3', value: 'the ethics of exotic genetics', tags: ['genetics', 'morality', 'conservation'], weight: 0.9, intensity: 'moderate' },
    { id: 'do4', value: 'ritual as retention strategy', tags: ['behavior', 'business', 'engagement'], weight: 0.9, intensity: 'moderate' },
    { id: 'do5', value: 'the disappearance of cultivar knowledge', tags: ['education', 'loss', 'urgency'], weight: 0.9, intensity: 'intense' },
    { id: 'do6', value: 'exclusivity without elitism', tags: ['access', 'culture', 'positioning'], weight: 1.0, intensity: 'moderate' },
    { id: 'do7', value: 'the sensory education deficit', tags: ['experience', 'learning', 'gap'], weight: 0.9, intensity: 'moderate' },
    { id: 'do8', value: 'legacy versus hype in brand building', tags: ['marketing', 'time', 'authenticity'], weight: 0.9, intensity: 'moderate' },
  ],
  metadata: { source: 'Content strategy', intensity: 'moderate' }
};

export const revelations: CategoryBank = {
  name: 'revelations',
  values: [
    { id: 'rv1', value: 'what appears as tradition is often recent invention', tags: ['history', 'myth', 'reality'], weight: 1.0, intensity: 'intense' },
    { id: 'rv2', value: 'the metrics we track mislead us about quality', tags: ['data', 'perception', 'error'], weight: 0.9, intensity: 'moderate' },
    { id: 'rv3', value: 'consumers are seeking constraint, not infinite choice', tags: ['choice', 'paradox', 'design'], weight: 0.9, intensity: 'moderate' },
    { id: 'rv4', value: 'the best products require education to appreciate', tags: ['barrier', 'access', 'learning'], weight: 0.9, intensity: 'moderate' },
    { id: 'rv5', value: 'sustainability and exclusivity are compatible', tags: ['ethics', 'luxury', 'balance'], weight: 0.9, intensity: 'subtle' },
    { id: 'rv6', value: 'scarcity of attention matters more than scarcity of product', tags: ['economics', 'attention', 'shift'], weight: 1.0, intensity: 'moderate' },
    { id: 'rv7', value: 'the next generation values provenance over prestige', tags: ['demographics', 'values', 'change'], weight: 0.9, intensity: 'moderate' },
  ],
  metadata: { source: 'Contrarian positions', intensity: 'moderate' }
};

export const parables: CategoryBank = {
  name: 'parables',
  values: [
    { id: 'pa1', value: 'the blacksmith who refused to automate', tags: ['craft', 'technology', 'choice'], weight: 1.0, intensity: 'moderate' },
    { id: 'pa2', value: 'the monastery that outlasted empires', tags: ['institution', 'time', 'stability'], weight: 0.9, intensity: 'intense' },
    { id: 'pa3', value: 'the cartographer who mapped the unprofitable', tags: ['exploration', 'value', 'different'], weight: 0.9, intensity: 'moderate' },
    { id: 'pa4', value: 'the keeper of seeds through the long winter', tags: ['preservation', 'hardship', 'hope'], weight: 0.9, intensity: 'intense' },
    { id: 'pa5', value: 'the architect who built for the fifth generation', tags: ['longterm', 'design', 'legacy'], weight: 0.9, intensity: 'moderate' },
    { id: 'pa6', value: 'the translator who found words that didn\'t exist', tags: ['language', 'creation', 'bridge'], weight: 0.8, intensity: 'moderate' },
    { id: 'pa7', value: 'the merchant who sold only to those who understood', tags: ['exclusivity', 'education', 'filter'], weight: 0.9, intensity: 'moderate' },
  ],
  metadata: { source: 'Narrative structures', intensity: 'moderate' }
};

// ═══════════════════════════════════════════════════════════════
// TESTIMONIAL & EXPERIENCE CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const experiences: CategoryBank = {
  name: 'experiences',
  values: [
    { id: 'ex1', value: 'the first encounter with true quality', tags: ['discovery', 'comparison', 'awakening'], weight: 1.0, intensity: 'intense' },
    { id: 'ex2', value: 'a ritual that became essential to practice', tags: ['integration', 'habit', 'necessity'], weight: 0.9, intensity: 'moderate' },
    { id: 'ex3', value: 'sharing with someone who finally understood', tags: ['connection', 'recognition', 'social'], weight: 0.9, intensity: 'moderate' },
    { id: 'ex4', value: 'the moment of recognizing lineage in a taste', tags: ['heritage', 'sensory', 'knowledge'], weight: 1.0, intensity: 'intense' },
    { id: 'ex5', value: 'a difficult period when this provided anchor', tags: ['support', 'hardship', 'function'], weight: 0.9, intensity: 'moderate' },
    { id: 'ex6', value: 'the accumulation of knowledge over time', tags: ['learning', 'journey', 'growth'], weight: 0.8, intensity: 'subtle' },
    { id: 'ex7', value: 'transition from casual to intentional use', tags: ['evolution', 'mindfulness', 'maturity'], weight: 0.9, intensity: 'moderate' },
  ],
  metadata: { source: 'Customer journey mapping', intensity: 'moderate' }
};

export const transformations: CategoryBank = {
  name: 'transformations',
  values: [
    { id: 'tr1', value: 'from seeking effects to appreciating craft', tags: ['maturity', 'education', 'shift'], weight: 1.0, intensity: 'moderate' },
    { id: 'tr2', value: 'from solitary use to ceremonial practice', tags: ['ritual', 'intention', 'elevation'], weight: 0.9, intensity: 'intense' },
    { id: 'tr3', value: 'from brand-agnostic to lineage-loyal', tags: ['commitment', 'knowledge', 'identity'], weight: 0.9, intensity: 'moderate' },
    { id: 'tr4', value: 'from consumer to advocate and educator', tags: ['role', 'influence', 'community'], weight: 0.9, intensity: 'moderate' },
    { id: 'tr5', value: 'from confusion to confident discernment', tags: ['competence', 'clarity', 'mastery'], weight: 0.9, intensity: 'moderate' },
    { id: 'tr6', value: 'from occasional to integrated lifestyle', tags: ['habit', 'identity', 'normalization'], weight: 0.8, intensity: 'subtle' },
  ],
  metadata: { source: 'Transformation research', intensity: 'moderate' }
};

export const settings: CategoryBank = {
  name: 'settings',
  values: [
    { id: 'se1', value: 'a private study with collected objects', tags: ['intimate', 'personal', 'curated'], weight: 1.0, intensity: 'moderate' },
    { id: 'se2', value: 'a remote location reached with intention', tags: ['journey', 'isolation', 'purpose'], weight: 0.9, intensity: 'intense' },
    { id: 'se3', value: 'a gathering of trusted practitioners', tags: ['social', 'expert', 'circle'], weight: 0.9, intensity: 'moderate' },
    { id: 'se4', value: 'the transition between day and evening', tags: ['temporal', 'liminal', 'daily'], weight: 0.9, intensity: 'subtle' },
    { id: 'se5', value: 'a creative practice already in progress', tags: ['flow', 'art', 'enhancement'], weight: 0.9, intensity: 'moderate' },
    { id: 'se6', value: 'preparation for significant conversation', tags: ['social', 'serious', 'bridge'], weight: 0.8, intensity: 'moderate' },
    { id: 'se7', value: 'restoration after extended demand', tags: ['recovery', 'self-care', 'balance'], weight: 0.8, intensity: 'subtle' },
  ],
  metadata: { source: 'Usage context research', intensity: 'moderate' }
};

// ═══════════════════════════════════════════════════════════════
// MASTER CATEGORY REGISTRY
// ═══════════════════════════════════════════════════════════════

export const categoryRegistry: Record<string, CategoryBank> = {
  product_types: productTypes,
  moods: moods,
  aesthetics: aesthetics,
  audiences: audiences,
  rituals: rituals,
  archetypes: archetypes,
  contrasts: contrasts,
  origins: origins,
  artifacts: artifacts,
  journeys: journeys,
  thresholds: thresholds,
  guardians: guardians,
  regions: regions,
  elements: elements,
  keepers: keepers,
  markers: markers,
  occasions: occasions,
  assemblies: assemblies,
  credentials: credentials,
  prices: prices,
  relations: relations,
  mutuals: mutuals,
  proofs: proofs,
  domains: domains,
  revelations: revelations,
  parables: parables,
  experiences: experiences,
  transformations: transformations,
  settings: settings,
};

// Total unique values across all categories
export function getTotalCategoryValues(): number {
  return Object.values(categoryRegistry).reduce((sum, cat) => sum + cat.values.length, 0);
}

// Get all category names
export function getCategoryNames(): string[] {
  return Object.keys(categoryRegistry);
}

export default categoryRegistry;
