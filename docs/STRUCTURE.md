# Repository Structure

```text
english-thinking-system/
├── README.md
├── PROJECT_MASTER.md
├── ROADMAP.md
├── skills/
│   ├── english-thinking/
│   ├── 3d-knowledge-card/
│   └── knowledge-map/
├── knowledge/
│   ├── vocabulary/
│   │   ├── S80/
│   │   ├── A200/
│   │   └── B570/
│   ├── grammar/
│   ├── roots-affixes/
│   └── confusion-groups/
├── curriculum/
│   ├── level-1/
│   └── 170-day-plan/
├── visual/
│   └── 3d-card-standard/
│       └── BE-reference/
├── data/
│   ├── vocabulary/
│   ├── knowledge-graph/
│   └── curriculum/
├── web/
└── docs/
```

## Directory Rules

- `skills/`: reusable AI operating instructions and generation standards.
- `knowledge/`: human-readable canonical learning content.
- `curriculum/`: learning sequence, daily lessons and review logic.
- `visual/`: visual standards and canonical references; BE 3D card is the visual baseline.
- `data/`: structured machine-readable data used by the website and future tools.
- `web/`: product implementation.
- `docs/`: governance, design decisions, migration notes and asset inventories.

Git does not retain empty directories, so directories are created as their first real asset is archived. Avoid placeholder files unless they contain useful rules or context.
