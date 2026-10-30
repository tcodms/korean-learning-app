# learn workspace

Owner: app-flow developer.

- LearnScreen: skill selection and topic catalog; reached from the Learn tab or Today shortcuts.
- LessonListScreen: three stages, six selectable preview lessons per skill/topic.
- LessonIntroScreen: objectives, sample phrase, vocabulary and start action.
- learn.mock.ts: UI fixtures only; progress and lesson metadata are samples.

Prototype.tsx owns selection and navigation. Start connects to the existing LessonPreview by skill; topic-specific question data is not implemented. Closing the lesson returns to its introduction. Learning result UI is shared with other flows.
