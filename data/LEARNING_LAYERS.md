# Quick / Deep / Network Learning Layers

This document defines how one canonical vocabulary item is exposed to learners at three depths. The layers are views over one source-of-truth knowledge object, not three separate explanations.

## 1. Quick — 快速理解
Goal: grasp the word in roughly 10–30 seconds.

Required fields:
- `hook`: ultra-short memory hook.
- `core_image`: the mental/spatial picture.
- `one_line`: one-sentence underlying logic.
- `prototype`: one prototypical example or scene.

Rules:
- no translation-list dumping;
- no long etymology;
- no more than one dominant teaching idea;
- should be understandable before opening Deep.

## 2. Deep — 深度学习
Goal: understand how the word grows from one core model and use it accurately.

Required content:
- underlying logic;
- meaning-growth branches;
- representative examples;
- high-frequency collocations;
- confusable contrasts;
- pitfalls when useful;
- root/prefix/suffix/etymology only when it materially improves understanding.

Rules:
- every branch must be traceable back to the core image/logic;
- examples must demonstrate the model, not merely contain the word;
- Chinese is an explanation bridge, not the primary memory object.

## 3. Network — 知识网络
Goal: show where the word sits in the learner's English conceptual system.

Required fields:
- `nodes`: linked words/concepts;
- `relations`: human-readable relationship statements;
- `next_recommended`: the best next nodes to learn or review.

Examples:
- `see → look → watch` as reception → eye direction → sustained tracking;
- `at → on → in` as point → surface/contact → container;
- `give ↔ get` as outgoing transfer ↔ incoming acquisition;
- `put ↔ take` as placement toward destination ↔ removal/control;
- `on ↔ off` as connection/contact ↔ detachment/disconnection.

## UI contract
The website may reveal the layers progressively:
1. Quick by default.
2. Deep when the learner chooses to understand more or fails recall/application.
3. Network after initial understanding, during review, comparison, or exploration.

The UI must not generate new semantic explanations on the fly when canonical layer data exists.

## Authoring contract
English Thinking Skill creates the semantic source object first. Layer data is then derived from that object. 3D Knowledge Card consumes the core image, core logic and card metaphor; Knowledge Map consumes the network layer.
