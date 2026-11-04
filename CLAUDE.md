# Miškova gramatika

A PWA for practising English grammar, made for Miško, a Slovak 3rd-grade pupil. It is the sibling of **Miškove slovíčka** (`../Misko slovicka`, repo https://github.com/MiroM73/MiskoveSlovicka): the same look, the same PWA shell (service worker, version check, update bar), the same words. The user writes in Slovak, so reply in Slovak.

Languages (the user's decision, same as the sibling): the app UI, the CHANGELOG in `version.js`, GitHub release notes and README.md are in **Slovak**. Code, code comments, commit messages and this CLAUDE.md stay in **English**.

- Status: local repo only, branch `main`, **not published yet**. The user reviews the working version first; then it goes to GitHub (planned like the sibling: a public repo under MiroM73 + GitHub Pages from `main`). Push only when the user asks.
- No build step, no dependencies, no tests. Plain static files.
- `scans/` holds the textbook scans (the "scope and sequence" table of contents of the 3rd-grade book, Units 1–10). It is in `.gitignore`, never committed. The PNGs are ~20 MB; downscale with Pillow (`pip install --target <scratchpad>`) before viewing.

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole app: inline CSS, word data, topic generators, exercises (~60 KB, no audio) |
| `version.js` | The app version, the single source (same scheme as the sibling) |
| `sw.js` | Service worker, a copy of the sibling's with the cache named `gramatika-X.Y.Z` |
| `manifest.webmanifest` | PWA manifest. Purple theme (`#6a4bd6`) so the icon differs from the blue Slovíčka icon |
| `fonts.css`, `fonts/` | Baloo 2 + Nunito, copied from the sibling |
| `icons/` | Purple speech bubble with "+ − ?", generated with Pillow |

## index.html structure

- Word lists `NN(unitLabel, "en|sk|skAccusative|gender;…")`: `SCHOOL`, `SPORT`, `ART` (3rd grade Unit 1), `FOOD`, `VEG`, `FOOD5` (Unit 2), `AFOOD` (Unit 3 L3, animal food, used when the subject is *it*), and 2nd-grade `SCHOOL2`, `TOYS`, `PETS`, `BODY` (used for *it* in have-got sentences), `FOOD2`. An English noun starting with "a/an" is countable singular; otherwise it takes "any" in negatives/questions (`anyN`), except `BODY` (`noAny`). The Slovak accusative and gender (m, ma = animate masculine, f, n, p) drive Slovak sentences and possessives (`TVOJ`, `SVOJ`).
- `PR` = the seven pronouns with their Slovak forms (`ma` mám/máš…, `rad` rád/rada/rado/radi, `would`, `can`, `poss`). Helpers `hv` (have/has), `dz` (do/does), `be`, `ap` ('ve/'s), `NT` (negatives), `short(p,yes,aux)` short answers (`ansP` swaps you↔I), `skQ` Slovak questions.
- `TOPICS` = 9 topic objects in the user's order: `T_GOT`, `T_HAVE`, `T_DIFF`, `T_MEAL`, `T_LIKE`, `T_WOULD`, `T_GOTQ`, `T_CAN`, `T_OURS`. Each has `rnd()` (random parameters), `gen(par)` → `{en, sk, alts, gap:{txt,a,opts,full?,sk?}, t3:{task,q,hint,clue,a,opts,say?}, ya?, na?}`, `pList`/`nPool`/`ok` (valid pronouns/nouns, for distractors), `rule` (Slovak text, tips, table columns/rows or `custom()`), `voc` (words shown in the rule step).
- Steps per topic: 1 rule, then `KINDS` = gap, t3 (topic-specific: change +/−, short answer with ✔/✘ clue, pick question/answer, change person), listen (TTS sentence → pick the Slovak meaning; distractors from `variants()` change one thing: person, polarity, noun, meal), order (word tiles), write (typed; `canon` expands contractions, `plain` accepts a missing apostrophe with a note; `alts` accept the other have/have got form).
- `drill(make, onDone, title, hint, review, list)` runs a round (`N_STEP`=10 items; wrong ones come back up to 3 times). `reviewSetup()` mixes topics/kinds (`REV`).
- Speech: `speechSynthesis` only (en-GB voice when available). No recordings.
- The update check / service worker registration script at the bottom is copied verbatim from the sibling.

Grammar decision to keep: with plain *have* the negative is **don't/doesn't have** (the user's brief wrote "I haven't / she hasn't" for the have section; the app teaches "I haven't" only with *got*, and the rule step says so).

## Versioning and releasing

Same as the sibling: bump `APP_VERSION` and add a Slovak CHANGELOG entry in `version.js`, commit, annotated tag `vX.Y.Z`, push with `--follow-tags`, `gh release create`. Current version: **1.0.0** (unreleased).

## Testing (Windows, Git Bash)

- git: `/c/Program Files/Git/cmd/git`, gh: `/c/Program Files/GitHub CLI/gh.exe` (not on PATH). No Node; Python 3.10 (`python -I`).
- Copy the site to the scratchpad, append a `<script>` that writes into `<pre id="TESTLOG">`, run headless Edge (`/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe --headless=new --dump-dom --virtual-time-budget=4000 file:///…`). Useful checks: generate a few hundred items per topic and assert no "undefined", the answer is among the options, options are unique, `listenOpts` gives 4 distinct sentences; and click through every topic's 6 steps plus a review round watching `window.onerror`. Screenshots: `--screenshot --window-size=420,1500` (headless Edge has a ~492px minimum width, so the right edge looks cut off).
