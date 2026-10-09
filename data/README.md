# Data layer

**Status:** Active domain index

## 850 vocabulary source authority

- **Canonical Editable Source:** [`vocabulary_850.json`](vocabulary_850.json)
- **Derived Representation:** [`vocabulary_850.csv`](vocabulary_850.csv) — compatibility mirror; not an independent editing source
- **Runtime Projection:** [`website/data.js`](../website/data.js) — the Level 1 subset produced by [`scripts/build_level1_site_data.js`](../scripts/build_level1_site_data.js) from the JSON source

Repository audit on 2026-09-25 confirmed that JSON and CSV contain the same 850 records and the same eight flat baseline fields after normalizing JSON `related` arrays to the CSV delimiter. Application build and validation code read the JSON source. No JSON↔CSV generator currently exists, so CSV is a manually synchronized Derived mirror, not a generated authority. Any authorized change to a baseline field must edit JSON first, synchronize CSV, and verify record-level equivalence.

## Recovered vocabulary baseline

The current canonical dataset contains 850 items with these eight flat baseline fields: `id`, `word`, `grade`, `level`, `category`, `subcategory`, `core_direction`, and `related`.

A separate historical 170-day schedule was also recovered. One older Chinese schedule file expands parenthetical forms and therefore yields 852 comma-separated display tokens; it must not be treated as the canonical count.

## Optional Pro learning layers

The eight flat baseline fields are canonical for every record. Optional `learning_layers` may appear only after review. It is nested JSON-only Pro lesson content and is not represented in `vocabulary_850.csv`. CSV remains a compatibility mirror of the eight flat fields, not a Pro-content editor.

`learning_layers.review_status` is `draft` or `reviewed`. Only a reviewed record with complete Quick, Deep, Network, and Assessment fields may be projected to a website Pro lesson. See [`vocabulary.schema.json`](vocabulary.schema.json).

## Important rule

Do not add nested Pro content to CSV or use website runtime files as an editor. The JSON record remains the only editable source for reviewed Pro semantics.
