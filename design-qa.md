# MAL UI preview — 2026-10-30

final result: passed

Scope: three coded screen designs, using temporary presentation state only. No backend, persistence, real audio, course engine, or production grading is connected.

Reference: `design/mal-home-reference.png` (390 × 940). Implementation: `app/src/MalPreview.tsx`, `app/src/prototype.css`. Direct side-by-side evidence: `docs/qa/mal-ui/home-comparison.png`. Three-screen board: `docs/qa/mal-ui/essential-screens.png`.

## Visual comparison

- Compared reference and implementation together at 1:1 device scale. Retained the cream canvas, cobalt headings/actions, lime streak and selected navigation, pale lavender plan/shortcuts, two white stats cards, and reading mascot beside the hero copy.
- Adjusted hero height, top spacing, stats gap, plan spacing and Explore spacing after the first comparison. Main content uses 20px side margins and a consistent rounded card/button system.
- Intentional differences: the protected runtime supplies status bar, phone frame, home indicator and touch cursor; its iPhone viewport is 393 × 852 rather than the 390 × 940 source. Lower home content scrolls above fixed navigation. Pixel 10 at 427 × 952 displays the complete default home content. The reading mascot is a matching newly generated asset, not the exact reference drawing.
- Skills and lesson extend the same color, typography, corner and icon system. Selected choices combine outline, fill, text and check marks. Hint and feedback panels retain the restricted palette.
- Inspected `home.png`, `skills.png`, `lesson.png`, `listening-final.png` and Pixel home captures. No unresolved major visual clipping or horizontal overflow in the final inspected layouts.

## Interaction verification

- Home → skills → toggle selections → Continue → home → lesson.
- Clearing every skill disables Continue; restoring a selection enables it.
- Empty question disables Check answer; selecting a word enables it. Hint, sample feedback and Back to Today work.
- Listening cards populate answer slots; Undo removes the last word. Typing mode accepts Korean input and exits into sample feedback. Audio controls animate without playing sound.
- Screen preview toolbar provides direct navigation. Character tap changes sprite poses. Review/Progress open sample panels.
- Browser console: no warnings/errors captured. TypeScript and Vite production build passed. Mobile runtime integrity passed for all 28 protected files; runtime files were not edited.

## Generated assets

`app/public/assets/mal/reading.png`: transparent cobalt round mascot, cream oval face, navy eyes, lime pencil, open book, restrained lime accents; generated to match the selected reference.

`app/public/assets/mal/reactions.png`: transparent four-frame horizontal sprite of the same mascot, greeting and celebrating. Used as pose animation, with reduced-motion support. UI itself is React/CSS, not a flattened screenshot.

---

# Historical V1 prototype design QA (superseded on mal-ui)

Status: passed for the initial browser prototype, 2026-10-29.

Reference: design/tiger-v1-orange-home-learn.png. Implementation: app/src/Prototype.tsx and app/src/prototype.css. Comparison: docs/qa/comparison.png.

## Visual review

Compared the approved board and actual app screenshots side by side. Retained the cream canvas, peach tiger scene, two progress cards, burnt-orange CTA, four learning areas, 2×2 category grid, everyday situation rows, and four-tab navigation. Category and state colors remain within the orange palette. Generated a standalone tiger scene rather than rendering the entire screen as an image.

Intentional adaptations: live study counts replace mock numbers; iPhone status bar and home indicator belong to the bundled runtime; smaller devices scroll to show all content; topic totals reflect available sample questions. The hero uses a newly generated matching tiger illustration, rather than a pixel-identical copy. Native install/build has not been tested.

## Browser evidence

- iPhone 393×852 and Pixel 10 427×952: inspected live UI; no horizontal overflow on Pixel.
- Completed all five mixed-lesson questions: input, arrangement, expression choice, listening choice, vocabulary choice.
- One deliberate wrong answer yielded 4/5 and one review item. Correctly answering that review removed it.
- Progress showed six submissions and the expected per-area totals. Reload retained history.
- Verified settings, source sheet, exit confirmation, and empty-review state.
- Browser console: no warnings/errors in the inspected session.
- Korean playback control invokes browser TTS; actual audible quality is not verified. Missing-voice notice and transcript remain available.

Fixed during QA: repeat-audio handling; accurate review-filter label; consistent playback speed; focus scrolling moving the outer phone portal after text input. After the focus fix, navigating back to Learn reported outer scrollTop=0 and keyboard-visible=false. Protected runtime files remain unchanged (28-file integrity check passes).

## Automated checks

TypeScript passes. Content tests pass (2): unique and reachable answers, all four areas covered, listening scripts present, Korean NFC/NFD handling, punctuation tolerance, and wrong-particle rejection. Production build passes. Vite reports one bundle-size warning; code splitting and font asset reduction are follow-up optimizations.

No known blocking visual or interaction defects remain in the tested prototype flow. Educational review of all sample content, real-device audio verification, and native packaging remain future work.

## Button refinement, 2026-10-29

Latest decision: user selected dusty blue #526F91 after rejecting black. Primary actions now use that blue, a darker blue hover #455F7F and blue lower edge #3D5571. The approved card shapes, tactile effects, peach surfaces and orange accents remain. Confirmed the live home CTA computes to rgb(82,111,145) with white text; white-to-blue contrast is approximately 5.20:1. Mobile runtime integrity passes. Current evidence: docs/qa/dusty-blue.png. The black trial below is historical.

User requested black primary actions. Changed the primary token to warm black #242220, with a separate circular arrow, a subtle lower edge, and press feedback. Kept peach/orange learning cards, outlined secondary actions, and orange selection states. Learning rows now have individual outlines and icon tiles; category and answer cards have restrained depth. Disabled primary actions retain their muted state, and reduced-motion styles cover the new transitions. This decision supersedes the initial burnt-orange CTA reference. Browser home appearance and Learn navigation were inspected; production build and the 28-file runtime integrity check pass. Evidence: docs/qa/black-buttons.png.
