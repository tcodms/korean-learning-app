# V1 prototype design QA

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
