# Arcana MBTI — Oracle Deck

A fully client-side, Indonesian personality exploration game built with React, Vite, TypeScript, Tailwind CSS, React Router, Context, and `useReducer`. No backend, account, database, or API key is required.

## Run

Use Node.js 22.8+ (or a compatible supported Node version) and npm:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run build       # TypeScript checks and production output in dist/
npm run preview     # Serve the production build locally
npm test           # Scoring, progression, storage, data and asset tests
npm run test:e2e    # Full browser journeys using installed Google Chrome
```

The browser tests start Vite automatically. If Chrome is unavailable, install it or remove `channel: 'chrome'` from `playwright.config.ts` and run `npx playwright install chromium`.

## Experience

- `/`: Stitch-based landing page, original card fan, MBTI explanation, gallery previews, and start CTA. Hero and featured cards open an in-place profile dialog (`/?card=TYPE`); switching types keeps the landing page mounted, and closing preserves its scroll position and focus.
- `/levels`: Four progression levels with locked, available, in-progress, and completed states. Unlocks are permanent until a confirmed reset.
- `/test/:levelId`: One statement at a time, original numbered answer cards, keyboard selection, previous/next navigation, and completion dialog. The `q` URL parameter supports refresh and browser history.
- `/result`: Guarded result page, lightweight card flip, actual artwork, calculated dimension percentages, complete profile, download, review, and confirmed reset.
- `/cards`: All 16 original cards, group filters, and search.
- `/cards/:type`: Direct-linkable profile dialog with Escape, focus containment, and close controls. Invalid types return to the collection.

## Source map

| Path | Responsibility |
| --- | --- |
| `src/data/questions.ts` | All prototype questions; 32 total, balanced across all four dimensions within each level |
| `src/data/levels.ts` | Four game-stage descriptions; stages are not dimensions |
| `src/data/mbtiTypes.ts` | All 16 profiles, traits, strengths, challenges, communication, environment, relationships |
| `src/data/mbtiCards.ts` | Centralized original artwork mapping |
| `src/context/MBTIContext.tsx` | Context, reducer, answer replacement, irreversible unlocks, persistence |
| `src/utils/scoring.ts` | Pure scoring, percentages, and deterministic type calculation |
| `src/utils/progression.ts` | Data-derived counts, completion, unlock and level status selectors |
| `src/utils/storage.ts` | Versioned storage validation and safe fallbacks |
| `src/components/` | Shared cards, answer scale, progress, profile, modal and layout components |
| `src/pages/` | Landing, progression, test, result and collection screens |
| `src/styles.css` | Stitch design tokens, responsive layouts, focus and reduced-motion styles |
| `scripts/extract_cards.py` | Reproducible, lossless cropping coordinates |
| `src/utils/game.test.ts` | Unit and data integrity tests |
| `tests/journey.spec.ts` | Chrome end-to-end and responsive checks |

## Scoring and persistence

Answers are the only score source. A choice `v` contributes `v - 1` to the question's direction and `5 - v` to the opposite direction. Each answered question contributes exactly four points across its pair. Changing an answer replaces its previous value; totals are recalculated rather than incrementally mutated.

Each percentage is its side's score divided by the pair total, rounded to an integer; the other percentage is `100 - first`. Empty totals safely display 50/50. Ties choose **E, N, T, J** from one centralized configuration. The result page explains balanced preferences without implying that a tie is a strong preference.

Only `{ version: 1, answers, highestUnlockedLevel }` is stored under `arcana-mbti:progress`. Scores, percentages and MBTI types are never persisted independently. Missing, invalid, outdated or unavailable storage cannot crash the app. Invalid answer entries are discarded. A confirmed reset removes only this app's storage key.

To add questions, edit the centralized bank, assign unique IDs, and keep a balanced mixture of dimensions and directions in each level. Counts, navigation and completion derive from the bank. Empty levels do not falsely count as completed. A changed bank may require answering new questions before a result becomes available, but existing unlocks remain accessible. Bump the schema version when intentionally invalidating all saved progress.

## Visual sources and artwork

`references/stitch_gamified_mbti_personality_card_game/` preserves the supplied HTML, five screenshots and `arcana_archetypes/DESIGN.md` as references, not application code. `references/original-artwork/` preserves both original sheets. `src/assets/cards/` contains the 16 MBTI crops and 10 answer crops used by the app.

Crops are PNGs at their original resolution; characters, typography and borders are not redrawn or resampled. Regeneration requires Python and Pillow only for the optional extraction script:

```sh
python scripts/extract_cards.py
```

The app uses the reference's Libre Caslon Text and Manrope fonts, bundled locally. The palette follows its obsidian, parchment and antique gold tokens. The questionnaire reference's generic answer boxes are replaced with the user's original Castle cards as requested. Selected answers use the parchment variant plus a gold outline and checkmark. All cards retain their proportions.

Reference-only simulation buttons, fictional player stats, unsubstantiated accuracy/rarity claims, and dimension-revealing question labels are omitted. CSS handles lightweight transitions and the reveal; `prefers-reduced-motion` is respected.

## Scope and limitations

- Questions are prototype content, not a psychometrically validated instrument. Results are reflection prompts, not diagnoses or absolute personality labels.
- Progress is local to this browser and origin; there is no cross-device sync. Blocking or clearing browser storage prevents persistence.
- Original card sheets limit source resolution. Enlarging a card may show source softness; no replacement artwork is generated.
- Production hosting needs a single-page application fallback to `index.html` for direct route visits. Vite development and preview servers already handle this.
- The original reference files are preserved for comparison and are not shipped by Vite in `dist/`.
