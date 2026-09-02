# English Thinking System · Project OS

Version: 2.0
Status: Active governance baseline
Last updated: 2026-09-02

## 1. Purpose and scope

This is the project’s highest governance entry. It defines which document decides what, freezes the decisions that must not drift, and prevents chat records, roadmaps, skills, or product pages from becoming competing sources of truth.

The product promise is:

> **把英语变成看得见的画面。**

The system trains learners to build an English scene, focus, relationship, sound, and expression directly from the world. It does not treat word-count completion as language ability.

## 2. Source-of-truth map

| Decision type | Canonical source | Boundary |
| --- | --- | --- |
| Governance, frozen decisions, document precedence | this file | Does not define lesson-level teaching details. |
| Teaching architecture, module responsibilities, ability and quality criteria | [docs/TEACHING_OS_V2.md](docs/TEACHING_OS_V2.md) | The only canonical teaching-architecture specification. |
| Product overview and repository map | [PROJECT_MASTER.md](PROJECT_MASTER.md) | Summary and index only; it must not restate or override Teaching OS rules. |
| Work priority and delivery status | [ROADMAP.md](ROADMAP.md) | Execution sequencing only; it must not redefine the teaching architecture. |
| Content-production method | [skills/english-thinking/SKILL.md](skills/english-thinking/SKILL.md) | Must implement the Teaching OS; it is not a higher policy source. |
| Vocabulary, plan, lessons, and code | `data/`, `curriculum/`, `content/`, `website/` | Asset and implementation truth within their stated scope. |

GitHub repository history is the version-record truth. A chat may explain a decision, but becomes binding only after it is written into the canonical document above.

## 3. Frozen decisions

The following decisions are frozen. A change requires an explicit governance update to this file and the relevant canonical specification.

1. Brand promise: **“把英语变成看得见的画面”**.
2. **Language ≠ Translation**: English learning starts from the world and English conceptual organization, not Chinese-to-English word replacement.
3. **Grammar Camera** is the sentence-focus engine.
4. The core learning spine is **SEE → FOCUS → GROW → READ → CREATE**; the full operating loop is `WORLD → SEE → FOCUS → GROW → READ → CREATE → CONNECT → REVIEW`.
5. **英语思维 Skill Pro** is the content-reasoning method; **Word Image Pro** is the learner-facing web component pattern for making a core image and meaning growth visible.
6. The 850 Vocabulary Foundation remains `S80 / A200 / B570`. It is a content-coverage system, not an ability-level system.
7. Knowledge Network uses meaningful left-to-right relationships. Do not use Simple Mind Map / SimpleMindMap as the default representation.
8. **Meaning First → Grammar Name Later**: learners first see the meaning and camera relationship; terminology is added only after it helps naming and reuse.
9. Learners choose their new-word load. Review scheduling is driven by demonstrated mastery, with intervals as safeguards rather than the definition of learning.

## 4. Change-control rules

- A teaching decision belongs in `docs/TEACHING_OS_V2.md`; do not duplicate its detailed rules in other documents.
- A frozen decision belongs here and must be linked, not copied, elsewhere.
- `PROJECT_MASTER.md` and `ROADMAP.md` must link to this file and the Teaching OS when their scope touches governance or teaching.
- Existing pages, lessons, data schemas, and Skills are implementation assets. This governance release does not imply that their current behavior has already been upgraded to every V2 rule.
- Historical and migration documents retain their record value but cannot overrule this Project OS.

## 5. Current governance status

The V2 teaching architecture is now frozen at document level. The next work is evidence-based adoption: audit content and product flows against the Teaching OS before changing implementation. No page implementation is changed by this governance baseline.

## 6. Reading order

1. Start here for authority and decision scope.
2. Read [docs/TEACHING_OS_V2.md](docs/TEACHING_OS_V2.md) for the teaching system.
3. Read [ROADMAP.md](ROADMAP.md) for current work priority.
4. Use [PROJECT_MASTER.md](PROJECT_MASTER.md) to locate repository assets.
