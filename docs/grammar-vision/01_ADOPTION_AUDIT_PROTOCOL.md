# Grammar Vision Adoption Audit Protocol

## Purpose and scope boundary

This protocol governs the Grammar Vision adoption audit only. It makes no implementation claim and changes no product asset.

## Source precedence

| Question | Authoritative document | Audit rule |
| --- | --- | --- |
| Governance, frozen decisions, document precedence | [`PROJECT_OS.md`](../../PROJECT_OS.md) (Project OS) | An audit cannot override a Project OS decision. |
| Whole-system teaching architecture and teaching-quality Gates | [`docs/TEACHING_OS_V2.md`](../TEACHING_OS_V2.md) (Teaching OS V2) | Use `TO-G1` through `TO-G7` for quality checks. |
| Grammar Vision course sequence and learning Gates | [`docs/grammar-vision/GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md`](GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md) (frozen Grammar Vision) | Use `GV-G1` through `GV-G7` for learner progress. |

For this audit, `TO-G1` through `TO-G7` identify the teaching-quality Gates defined in the Teaching OS, and `GV-G1` through `GV-G7` identify the Grammar Vision learning Gates in the frozen course architecture.

## Status labels

| Status | Evidence required | Prohibited statement |
| --- | --- | --- |
| 已实现 | A tracked asset, data field, or page behavior exists on main. | “已验证” unless verification evidence is linked. |
| 已验证 | A reproducible test, manual check record, or accepted review proves stated behavior. | “完整覆盖” unless scope explicitly enumerated. |
| 已确认方向 | Project OS, Teaching OS, or frozen course decision specifies target. | “已上线” or “已接入”. |
| planned | Future action has a named output and dependency. | “正在使用” or “默认行为”. |

## Conflict record template

| ID | Source A | Source B | Exact conflicting claim | Affected nodes/assets | Evidence link | Risk | Owner decision required | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Teaching, product, or true-source conflicts stop the affected audit item until an Owner decision exists.

## Source documents

- [Project OS](../../PROJECT_OS.md)
- [Teaching OS V2](../TEACHING_OS_V2.md)
- [Grammar Vision MVP Course Architecture V1.0 Frozen](GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md)
