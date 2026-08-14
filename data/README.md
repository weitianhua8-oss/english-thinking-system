# Data layer

## Recovered vocabulary baseline
The previous Basic English web system contains a clean 850-item vocabulary dataset with IDs, word/base form, IPA, Chinese gloss, category, example and Chinese example translation. This is the legacy baseline for the new project.

A separate historical 170-day schedule was also recovered. One older Chinese schedule file expands parenthetical forms and therefore yields 852 comma-separated display tokens; it must NOT be treated as the canonical count. The web-system dataset contains exactly 850 vocabulary records and is the canonical legacy baseline.

## Migration policy
Do not overwrite legacy fields with newly generated English-thinking explanations. Enrichment is additive and reviewable.

Each item gains:
- tier: S80 / A200 / B570 (only after the historical tier list is recovered or a new tiering decision is explicitly approved)
- core_image
- core_logic
- meaning_growth
- scenes
- collocations
- confusions
- pitfalls
- memory_hook
- root_affix
- knowledge_links
- card_metaphor
- content_status

See `vocabulary.schema.json`.

## Content states
- legacy: recovered old content, not yet processed by the current English Thinking Skill
- draft: generated/enriched but not reviewed
- reviewed: checked against the Skill and learning goals
- canonical: approved source content for production use

## Important rule
Do not invent the S80/A200/B570 assignment from memory. Until the exact historical tier list is found, keep `tier` null. This prevents a guessed taxonomy from becoming project truth.
