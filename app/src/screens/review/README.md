# review workspace

Owner: app-flow developer.

- ReviewScreen: review/saved collections, skill filters, bookmarks and empty states.
- StudyItemScreen: word, grammar and expression notes with examples and usage tips.
- review.mock.ts: six original UI sample notes; no live review scheduler.

Prototype.tsx owns the selected note, filters and temporary saved IDs. A detail returns to the same list/filter state. Practice opens the existing skill preview, not a note-specific quiz. No data persists across refreshes.
