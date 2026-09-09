# English Thinking System · GitHub Capability Map V1

**Audit ID:** GHR-01
**Status:** Research / architecture audit only — not an implementation approval
**Scope:** External open-source capability research. No course source, product page, vocabulary data, Grammar Vision frozen node, dependency, or learner-facing term is changed by this document.

## 1. Executive Summary

English Thinking System should not fork an English-learning application. It should preserve its own teaching architecture and selectively use external software only where it supplies a bounded technical capability.

The near-term decision is:

- **Borrow later:** `ts-fsrs@5.4.2`, only as a review-scheduling library behind a project-owned `MemoryObject` adapter.
- **Research / isolated experiment only:** spaCy, benepar, Stanza, Whisper, faster-whisper, Montreal Forced Aligner (MFA), `aeopress/Ogden`, and ELK.js.
- **Reference only:** `mythquan/basic_english`, whose repository has no explicit license.
- **Defer:** React Flow. Its MIT license is suitable, but the project has no approved graph-page implementation task.
- **Build ourselves:** mastery evidence, Grammar Vision mapping isolation, English 850 validation specification and data provenance, learner-visible knowledge-graph semantics, and child pronunciation-feedback policy.

No parser, speech system, layout library, or external word list may become teaching truth. They are instruments around the project’s teaching truth.

## 2. Current System Needs

The project’s governing loop is `WORLD → SEE → FOCUS → GROW → READ → CREATE → CONNECT → REVIEW`. The compact learner spine is `SEE → FOCUS → GROW → READ → CREATE`. Review must be driven by demonstrated mastery rather than a fixed date being treated as proof of learning.

The present website is a dependency-free static application. Its current review records use `mastery`, `reviewCount`, `history`, `lastSeen`, and `nextReview`, with fixed 1/3/7/14/30-day safeguards. That is a valid existing implementation asset, not a reason to silently replace the learning model.

The capability gap is therefore not “add AI everywhere.” It is to create bounded, evidence-led technical support for review scheduling, future analysis experiments, and later knowledge-network presentation while preserving the following authorities:

1. `PROJECT_OS.md` — governance and frozen decisions.
2. `docs/TEACHING_OS_V2.md` — canonical teaching architecture, C0–C5, six-dimensional evidence, and TO-G1–TO-G7.
3. `docs/grammar-vision/GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md` — 43 cognitive nodes, three rails, children’s terms, and Grammar Vision constraints.
4. Existing vocabulary, course, content, and website files — asset and implementation truth within their own scope.

## 3. External Capability Map

| Capability | Candidate | What it can supply | Decision now | Why |
| --- | --- | --- | --- | --- |
| Review scheduling | `open-spaced-repetition/ts-fsrs@5.4.2` | Card state transitions and review logs | Borrow later | MIT and suitable for TypeScript, but it does not define mastery. |
| Dependency and POS analysis | `explosion/spaCy` | Tokens, lemmas, POS and dependencies | Research only | Parser signals need a project-owned mapper; model licenses are separate. |
| Constituency analysis | `nikitakit/self-attentive-parser` / benepar | Phrase and constituent trees | Research only | Useful X-Ray evidence, never a course tree. |
| Second parser baseline | `stanfordnlp/stanza` | Independent token/POS/dependency comparison | Research only | A comparison instrument, not a production dependency. |
| Speech recognition | `openai/whisper`, `SYSTRAN/faster-whisper` | “What did the learner say?” | Research only | ASR is not pronunciation assessment. |
| Forced alignment | `MontrealCorpusTools/Montreal-Forced-Aligner` | Word/phone timing under an expected transcript | Research only | Alignment alone is not a child-facing score. |
| Basic English study | `aeopress/Ogden` | Data-model and content-license example | Research only | Code and content have different licenses. |
| Basic English validator study | `mythquan/basic_english` | Rule-engine behavior to inspect | Reference only | No explicit repository license. |
| Node canvas | `xyflow/xyflow` / React Flow | Future node-based UI | Defer | MIT, but no approved graph UI task exists. |
| Automatic layout | `kieler/elkjs` | Layered, left-to-right layout experiment | Research only | EPL-2.0 distribution obligations need release-policy review. |

## 4. Memory Engine

### Decision

`ts-fsrs@5.4.2` is an MIT-licensed package and is the only candidate suitable for a future, isolated scheduling integration. It must not replace the project’s definition of learning or reduce mastery to a single recall rating.

### Required project-owned boundary

The project must own an adapter concept such as:

```text
MemoryObject
  id
  kind: word | grammar_node | sentence_pattern
  source_ref
  evidence: SEE | HEAR | UNDERSTAND | DISTINGUISH | CREATE | TRANSFER
  review_state
  migration_metadata
```

`ts-fsrs` may calculate a next retrieval opportunity from `review_state`. The project must calculate and retain six-dimensional evidence, learner-controlled new-word load, content kind, and next-activity routing.

### Migration rule

Any later implementation must preserve existing local progress records. A migration must be explicit, reversible in test data, and never reinterpret historic `mastery` numbers as FSRS ratings without documented mapping and regression tests.

## 5. Grammar X-Ray Engine

### Candidate roles

- **spaCy:** tokenization, lemma, POS, morphology and dependency signals.
- **benepar:** constituency/phrase structure signals such as NP, VP, PP and clause structure.
- **Stanza:** an independent parser for comparison or audit samples.

### Frozen isolation rule

The only permitted architecture is:

```text
Raw Sentence
  → Parser Result (non-canonical evidence)
  → Grammar Vision Mapper (project-owned, versioned)
  → Candidate audit tags / reviewer evidence
  → Frozen Grammar Vision node, Camera Tree, English Code shadow rail
```

Parser Result is neither a lesson source nor a curriculum decision. It must not add, remove, merge, rename, resequence, or reinterpret any of the 43 frozen cognitive nodes, Camera Control rail, English Code Shadow rail, or fixed children’s terminology. A disagreement between parser output and the frozen baseline is an audit record requiring Owner review — never an automatic correction.

### Product boundary

These Python ecosystems are not dependencies for the present static website. Before any production proposal, an experiment must separately identify the exact language model, model license, training-data provenance, execution location, latency, retention policy, and failure behavior.

## 6. Knowledge Graph Engine

The project’s Knowledge Network must show learner-visible, meaningful left-to-right relationships. It must not become a decorative tree or reintroduce Simple Mind Map / SimpleMindMap.

React Flow is MIT and could later render an approved node-based interface. It does not define the graph semantics, prerequisite rules, unlock logic, mistakes, or teaching explanation; those are project-owned data and UX decisions.

ELK.js is valuable for a future left-to-right layout experiment. It is not approved for product inclusion until its EPL-2.0 distribution and notice obligations are reviewed for the exact integration and release path. No current task needs either package.

## 7. Speech Recognition Engine

Whisper and faster-whisper answer a narrow question: **what did the learner probably say?** They can support expected-sentence verification or route a learner to a retry, but neither ASR confidence nor transcript edit distance is a pronunciation-accuracy score.

The permitted future boundary is:

```text
Learner audio
  → ASR transcript
  → Expected-sentence verification
  → optional pronunciation research pipeline
  → child-safe, bounded feedback route
```

Before any child-audio experiment, the Owner must approve consent, minimum collection, local/remote processing, retention and deletion policy, parent visibility, and a no-recording alternative. No audio service is added in this audit.

## 8. Basic English Validator

`mythquan/basic_english` demonstrates useful questions: 850-base-word checks, word categories, 18 operators, inflections, contractions, allowed international words, and restricted-output validation. Because the repository has no explicit license, neither its code nor its data may be copied, adapted, or packaged into this project.

`aeopress/Ogden` demonstrates a cleaner dual-license separation: application code is MIT, while its word list, Chinese definitions, English definitions, examples, synonyms, and research notes are CC BY-SA 4.0. Its contents may not enter a proprietary project data set; the project must not treat “Ogden 850” as a license-free dataset.

The project must build `English850ValidatorSpec V0.1` from independently documented rules and project-owned data provenance. It must distinguish:

```text
rule specification ≠ canonical word data ≠ teaching explanation ≠ validation result
```

## 9. Pronunciation X-Ray

MFA can align an expected transcript with audio and provide word/phone timing. It does not establish whether a learner’s pronunciation is correct, intelligible, age-appropriate, or pedagogically ready for a numerical score.

The research-only architecture is:

```text
Expected sentence → approved dictionary / G2P → expected phonemes
Learner audio → forced alignment → timestamps and diagnostics
Teacher-designed feedback policy → one actionable child-facing next step
```

Any future scoring work must be separately validated against age range, accent variety, recording conditions, error types, calibrated thresholds, human review samples, and false-positive/false-negative risks. The Sound Layer remains tied to meaning, rhythm, stress and output; it is not a stand-alone score.

## 10. License Matrix

This matrix is a technical audit, not legal advice. Exact package/model versions must be rechecked immediately before any adoption.

| Repository / asset | Code license | Model license | Data / content / dictionary license | Commercial condition | Attribution / notices | Copyleft risk | Evidence | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `open-spaced-repetition/ts-fsrs@5.4.2` | MIT | N/A | N/A | Permitted under MIT | Preserve MIT notice when distributing substantial portions | No | [npm version](https://www.npmjs.com/package/ts-fsrs?activeTab=versions), [LICENSE](https://github.com/open-spaced-repetition/ts-fsrs/blob/main/LICENSE) | BORROW LATER |
| `explosion/spaCy` | MIT | Per downloaded model; verify per artifact | Training data/provenance differs by model | Library permitted; model-specific review required | Preserve MIT notice for code | Code: no; model/data: variable | [LICENSE](https://github.com/explosion/spaCy/blob/master/LICENSE) | RESEARCH ONLY |
| `nikitakit/self-attentive-parser` / benepar | MIT | Per parser/checkpoint and upstream base model | Training corpus and tokenizer terms require separate check | Code permitted; asset review required | Preserve MIT notice | Code: no; assets: variable | [repository](https://github.com/nikitakit/self-attentive-parser) | RESEARCH ONLY |
| `stanfordnlp/stanza` | Apache-2.0 | Per downloaded model | UD/treebank/model provenance requires separate check | Permitted under Apache-2.0; asset review required | Preserve Apache notices and NOTICE where applicable | No for library; assets variable | [LICENSE](https://github.com/stanfordnlp/stanza/blob/main/LICENSE) | RESEARCH ONLY |
| `openai/whisper` | MIT | MIT for official released weights | Training corpus not released as a reusable project dataset | Permitted under MIT | Preserve MIT notice | No | [repository and license](https://github.com/openai/whisper) | RESEARCH ONLY |
| `SYSTRAN/faster-whisper` | MIT | Converted Whisper weights require source-artifact check | No teaching/audio content included by default | Permitted under MIT, subject to model/runtime terms | Preserve MIT notice | No | [repository](https://github.com/SYSTRAN/faster-whisper) | RESEARCH ONLY |
| `MontrealCorpusTools/Montreal-Forced-Aligner` | MIT | Acoustic/G2P model-specific | Dictionaries and corpora model-specific | Code permitted; every selected model/dictionary separately reviewed | Preserve MIT notice and required model/dictionary notices | Code: no; assets: variable | [LICENSE](https://github.com/MontrealCorpusTools/Montreal-Forced-Aligner/blob/main/LICENSE) | RESEARCH ONLY |
| `aeopress/Ogden` | MIT for listed application code | N/A | CC BY-SA 4.0 for word data, definitions, examples, synonyms and research notes | Code can be reused under MIT; content derivatives must honor CC BY-SA terms | Keep applicable MIT and CC BY-SA attribution/notices | Content share-alike | [dual-license statement](https://github.com/aeopress/Ogden) | RESEARCH ONLY |
| `mythquan/basic_english` | No explicit license found | N/A | No explicit content license found | Do not reuse | No reuse permitted absent a license | Unknown / avoid | [repository](https://github.com/mythquan/basic_english) | REFERENCE ONLY |
| `xyflow/xyflow` / React Flow | MIT | N/A | N/A | Permitted under MIT | Preserve MIT notice | No | [LICENSE](https://github.com/xyflow/xyflow/blob/main/LICENSE) | DEFER |
| `kieler/elkjs` | EPL-2.0, with GPL-3.0-or-later secondary option in marked source | N/A | N/A | Conditional on chosen license and distribution design | EPL notices/source availability obligations for distributed program modifications | Weak/copyleft policy review required | [LICENSE](https://github.com/kieler/elkjs/blob/master/LICENSE.md) | RESEARCH ONLY |

## 11. Build / Borrow / Reference Decision

| Classification | Project-owned responsibility | External input allowed |
| --- | --- | --- |
| **BUILD** | Six-dimensional mastery evidence, `MemoryObject` schema, legacy-progress migration, Grammar Vision Mapper, 850 validator specification and canonical data, graph semantics, pronunciation-feedback policy | Research findings only; no copied unlicensed code/content. |
| **BORROW LATER** | Adapter, test suite, privacy/retention handling, learner-facing meaning | `ts-fsrs@5.4.2` scheduler only. |
| **RESEARCH ONLY** | Experiment protocol, asset-license register, reviewer decision | spaCy, benepar, Stanza, Whisper, faster-whisper, MFA, Ogden, ELK.js. |
| **REFERENCE ONLY** | Independently authored specification and data | basic_english behavior and feature ideas, never its code or data. |
| **DEFER** | No current product work | React Flow, until a separately approved Knowledge Network UI task exists. |

## 12. Architecture Integration Diagram

```text
                 ┌───────────────────────────────────────────┐
                 │ Project OS / Teaching OS / Frozen GV V1.0 │
                 │        Canonical teaching authority        │
                 └─────────────────────┬─────────────────────┘
                                       │
     ┌─────────────────────────────────┼──────────────────────────────────┐
     │                                 │                                  │
MemoryObject evidence             Grammar Vision Mapper             Knowledge semantics
SEE / HEAR / UNDERSTAND           reviewed candidate tags            prerequisite / contrast /
DISTINGUISH / CREATE /            only; never automated truth        return reason
TRANSFER                           │                                  │
     │                              │                                  │
ts-fsrs scheduler            Parser Result (research)          future React Flow / ELK
     │                              │                                  │
     └───────────────► learner-specific next step ◄────────────────────────┘

Speech research: learner audio → ASR/alignment → bounded diagnostics →
project-owned child-safe feedback policy → one next action
```

## 13. Recommended Implementation Order

1. **No-code ADR / data contract:** define `MemoryObject`, evidence ownership, legacy record mapping, and a migration rollback rule. It must leave existing review behavior intact.
2. **Isolated scheduler proof:** add no page behavior until deterministic tests prove that imported/exported progress preserves existing records and `ts-fsrs` only schedules retrieval.
3. **Grammar X-Ray offline corpus experiment:** choose a small, non-learner-facing sentence set; record parser disagreements as evidence and validate that none changes frozen nodes or children’s terms.
4. **English850ValidatorSpec V0.1:** document independently sourced rules and data provenance before implementing any validator.
5. **Only after these reviews:** consider a graph UI experiment or speech research proposal as separate, Owner-approved tasks.

## 14. Risks

| Risk | Control |
| --- | --- |
| Parser output overwrites pedagogy | Mapper isolation, candidate-only output, Owner review for every disagreement. |
| FSRS redefines mastery | Keep six dimensions and learner routing project-owned; FSRS only schedules retrieval. |
| License is checked only at repository level | Maintain code/model/data/dictionary columns and verify exact downloaded artifacts. |
| CC BY-SA content contaminates proprietary learning data | Do not copy Ogden content; preserve provenance and create independent canonical data. |
| ASR becomes a misleading pronunciation score | Prohibit confidence/edit-distance scoring; require a separate validation plan. |
| Children’s audio is collected without an adequate policy | Require Owner-approved consent, minimal collection, retention/deletion and no-recording route before any experiment. |
| Graph tools create a pretty but meaningless tree | Build learner-visible relationship semantics first; defer canvas libraries. |
| Frozen architecture drifts through “helpful” automation | Keep source hierarchy explicit and prohibit automatic updates to nodes, rails and terms. |

## 15. Explicit Non-Goals

This audit does **not**:

- modify any Grammar Vision Frozen Baseline rule, node, rail, Gate, children’s term, course script, page, animation, interaction, 850 word, or approved Word Image asset;
- add npm/Python dependencies, fork an external repository, install a model, create a service, or change the static website;
- treat parser output as teaching truth or use it to batch-map Grammar content;
- treat ASR confidence, transcript edit distance, alignment timing, or any one number as pronunciation accuracy;
- copy code or data from unlicensed `basic_english`, or copy CC BY-SA Ogden content into the project’s core vocabulary data;
- reintroduce Simple Mind Map / SimpleMindMap;
- claim that research-only, deferred, or frozen designs are already implemented.

**GHR-01 conclusion:** The architecture direction is sound only under these boundaries. The first allowable future implementation is a separately reviewed, isolated `MemoryObject` + `ts-fsrs` scheduling adapter; it must not change teaching truth or the current learner experience without its own approval.
