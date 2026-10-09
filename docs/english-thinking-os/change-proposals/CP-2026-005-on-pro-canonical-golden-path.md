# Change Proposal: ON Pro Canonical Golden Path

**Proposal ID:** CP-2026-005

**Status:** Owner Approved

**Requested By:** Project Owner

**Date:** 2026-10-08

## Old Rule

data/vocabulary_850.json is the declared canonical editable vocabulary source, but its current schema does not match the eight fields actually present in all 850 records. Its optional learning_layers shape cannot project a complete V2 website lesson or transfer/output assessment.

The website currently contains a second, static semantic definition for on in website/v2-data.js. The build script creates website/data.js from Level 1 vocabulary, lessons and plan only; it does not project reviewed Pro content. Consequently, on can be opened through multiple existing routes, but no one canonical record controls its Quick, Deep, Network, transfer, and output content.

## New Rule

For this one-word pilot, the data/vocabulary_850.json record with id 35 and word on becomes the only editable semantic source for reviewed Pro lesson content through an optional learning_layers object.

The schema will make the current eight baseline fields required for every 850 record and define the reviewed learning_layers contract. A reviewed record is projected by scripts/build_level1_site_data.js into Derived website/data.js as D.proLessons. website/app.js will merge that Derived node into the static V2 base graph before graph validation and rendering.

website/v2-data.js will no longer contain a semantic node whose id is on. Golden sample files remain Reference Only inputs for review; they are not build inputs or alternative sources.

The pilot's public teaching path is restricted to:

Quick → Deep → Network → new-scene transfer → fill-in output.

It teaches only physical contact with a supporting surface. It does not add time, media/platform, on/off, etymology, audio, or a persistent mastery model.

## Reason

The P3.x audit found duplicated on content in V1, Golden samples, static V2 data and Word Image materials. The duplicate static V2 definition is the active website course source, while the declared canonical vocabulary data cannot yet express the needed reviewed Pro course and assessment. This makes changes hard to trace and permits semantic drift.

The Owner approved an ON-only convergence pilot and selected the direct-canonical integration design. The smallest safe implementation is to make one canonical record project one runtime node, retain unrelated existing systems, and verify a learner can transfer the contact relation to a new scene.

## Affected Nodes

- Vocabulary record: id 35, word on.
- V2 runtime node: id on, system space-relations.
- Existing V2 relation targets that point to on, including relations from in and at.
- No Grammar Vision node, frozen Grammar rule, or system list changes.

## Affected Lessons

- Existing Level 1 on lesson remains available and is not rewritten.
- V2 on lesson changes source from static website data to a Derived projection.
- Word Image ON and Sentence materials remain their current bounded modules and are not rewritten.
- The new transfer/output segment is shown only in the projected on Pro lesson.

## Affected Data

- data/vocabulary_850.json: one additive learning_layers object on the on record.
- data/vocabulary.schema.json: baseline required fields corrected; optional reviewed Pro contract added.
- data/README.md: source and CSV-mirror boundary clarified.
- scripts/build_level1_site_data.js: creates and validates D.proLessons.
- website/data.js: regenerated Derived output adds proLessons.
- website/v2-data.js: removes static on semantic content.
- website/app.js: constructs the merged runtime graph and renders transient transfer/output interaction state.
- website/app.test.js: adds data, graph, interaction and isolation regression coverage.
- website/assets/on-transfer-hat-bed.svg: one local original illustrative asset.

The CSV remains a compatibility mirror of the eight flat baseline fields. The nested learning_layers object is not serialized into CSV and the CSV must not become a second editor for Pro content.

## Migration Required

**Yes.**

1. Add and review the on learning_layers content in JSON while retaining all eight baseline fields and all 850 records.
2. Update the schema and README so required fields describe the existing source accurately and reviewed Pro content is optional.
3. Change the build script to reject invalid reviewed Pro records before it writes website/data.js.
4. Generate D.proLessons from JSON and regenerate website/data.js.
5. Remove the static on node from website/v2-data.js.
6. Merge the derived node at website runtime, validate the merged 13-node graph, and render the bounded transfer/output flow.
7. Run automated, manual, and independent review checks before Owner acceptance.

**Rollback:** revert the implementation commit set associated with this CP. This restores the static on node and prior generated runtime file together. No existing V1/V2 persistent progress key is changed, so no learner-data migration or deletion is required.

## Backward Compatibility

- The JSON remains exactly 850 records; all pre-existing eight baseline values remain unchanged.
- The other 849 records do not need learning_layers and remain valid.
- Existing Level 1 on lesson, other twelve V2 nodes, Word Image, Sentence and local progress contracts remain available.
- The runtime graph remains 13 nodes across the existing four systems after merge.
- on receives only a transient page-session completion state; this does not write or reinterpret V1 review, V2 module, Word Image, Sentence, Culture, Camera or World progress.
- No external dependency, service, account, or remote visual asset is introduced.

## Regression Tests

Automated:

- JSON has 850 records and all eight baseline fields.
- on is the only reviewed Pro record and satisfies the reviewed learning_layers contract.
- Invalid reviewed content, duplicate runtime ids, invalid relation types, and missing relation targets cause the build to fail before output changes.
- A rebuild produces D.proLessons in website/data.js and restores it after a manual runtime edit.
- The V2 base data has no on node; the merged runtime graph has exactly one on node, four systems, thirteen nodes, and zero validation errors.
- Existing V2 nodes remain usable; on is opened from the derived node.
- Transfer and fill-in correct/incorrect/blank states render safely and do not mutate persistent progress.
- node --test website/app.test.js passes in full.

Manual:

- At desktop width and about 375px width, open on, select an incorrect transfer answer, correct it, then complete the output fill-in.
- Confirm no long-term mastery claim appears after returning to on.
- Open in, at, a non-space V2 node, Word Image and Sentence to confirm routes remain usable.

## Reviewer

Independent reviewer required under docs/english-thinking-os/governance/REVIEW_PROTOCOL_V1.md. The review must check:

1. JSON is the unique editable source for on Pro semantics.
2. Golden files and static V2 data are not active duplicates.
3. the schema baseline matches all existing records;
4. the one-new-variable teaching boundary is respected;
5. no persistent progress contract changes;
6. automated and manual evidence matches this Proposal.

## Version Impact

**MAJOR.** This replaces the active source of the public V2 on lesson, corrects the vocabulary schema's required-field contract, and adds a canonical-to-runtime projection boundary. The numerical scope is small, but the source-of-truth and compatibility contract change is substantive.

## Source Status Changes

| Source | Old status | New status after implementation |
|---|---|---|
| data/vocabulary_850.json record on | Canonical vocabulary metadata; no Pro lesson payload | Canonical editable source for on Pro lesson content |
| data/vocabulary.schema.json | Stale required-field contract | Contract for actual eight-field base plus optional reviewed Pro content |
| data/golden-samples.v1.json | Review sample, not consumed | Reference Only; unchanged |
| data/golden-learning-layers.v1.json | Review sample, not consumed | Reference Only; unchanged |
| website/v2-data.js on node | Active static on semantic runtime source | Removed; no longer a source for on |
| website/data.js D.proLessons | Absent | Derived runtime projection; never hand-edited |

## Owner Decision

**Approved — 2026-10-09.** The Owner authorizes only the ON-only migration described in this CP. No additional word, teaching meaning, frozen rule, persistent-progress contract, or remote asset is authorized.
