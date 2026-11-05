# Miškova gramatika

A PWA for practising English grammar, made for Miško, a Slovak 3rd-grade pupil. It is the sibling of **Miškove slovíčka** (`../Misko slovicka`, repo https://github.com/MiroM73/MiskoveSlovicka): the same look, the same PWA shell (service worker, version check, update bar), the same words. The user writes in Slovak, so reply in Slovak.

Languages (the user's decision, same as the sibling): the app UI, the CHANGELOG in `version.js`, GitHub release notes and README.md are in **Slovak**. Code, code comments, commit messages and this CLAUDE.md stay in **English**.

- Repo: https://github.com/MiroM73/MiskovaGramatika (public), branch `main`, GitHub Pages from `main`: https://mirom73.github.io/MiskovaGramatika/. Push only when the user asks.
- No build step, no dependencies, no tests in the repo. Plain static files.
- `scans/` holds the two scanned pages of the textbook's table of contents (ScanImage001 = Starter + Lessons 1–3 of Units 1–10, ScanImage002 = Lesson 4 Story, Lesson 5 Skills and Culture, Project and Review). It is in `.gitignore`, never committed. The PNGs are ~20 MB; downscale with Pillow (`pip install --target <scratchpad>`) before viewing.

## Structure (the user's decision)

The app follows the textbook: **Unit 1–10**, each with **Lesson 1 Words (+ Functional language), Lesson 2 Grammar, Lesson 3 Words and Grammar, Lesson 4 Story, Lesson 5 Skills and Culture (Writing focus), Project and Review**. Sentences must use the words of the matching unit and lesson (Lesson 2 grammar uses Lesson 1 words). Every grammar topic is practised for all persons I, you, he, she, it, we, they where it makes sense. Exceptions with a reason: *it* in have-got sentences uses 2nd-grade animal body parts (BODY) and toys (ITTOYS); "Can I use your …?" has no *it*; Unit 3 animal facts decide the answers (no ✔/✘ clue). The Starter unit is not included.

## Files

| Path | What it is |
|---|---|
| `index.html` | Layout, CSS, the update check (copied from the sibling). Loads `version.js` then `app.js`. A head script does the app zoom (Ctrl+wheel, Ctrl +/−/0, two-finger pinch; CSS `zoom: var(--z)` on `.wrap`, 0.5–2.5, saved in localStorage `gramatika-zoom`, reset button `#zr`) and sets the width classes `w-xs` ≤460 / `w-s` ≤520 / `w-m` ≥700 / `w-l` ≥1000 on `<html>` from screen width ÷ zoom. Use these classes, not width media queries. `w-l` = picker as a sticky left sidebar beside `.stage` (rail + `#app`) |
| `app.js` | Everything else: words, the sentence engine, topics, `UNITS`, the UI |
| `version.js` | The app version, the single source (same scheme as the sibling) |
| `sw.js` | Service worker, the sibling's with the cache named `gramatika-X.Y.Z` and `app.js` in `FILES` |
| `manifest.webmanifest` | PWA manifest. Purple theme (`#6a4bd6`) so the icon differs from the blue Slovíčka icon. No `orientation` lock, so tablets can use the wide layout in landscape |
| `fonts.css`, `fonts/`, `icons/` | Fonts copied from the sibling; purple "+ − ?" icons generated with Pillow |

## app.js, top to bottom

- **Words**: `NN(unitLabel, "en|sk|skAccusative|gender;…")` lists named by unit (`SCHOOL`, `SPORT`, `ART`, `FOOD`, `VEG`, `FOOD5`, `AFOOD`, `POSS4`, `CLOTHES`, `THINGS4`, `FURN`, `KITCH`, `HOME5`, …), plus special shapes: `AN` animals with facts (`can`, `live`, `eat`), `PLACES`, `VEH`, `GAMES`, `VP` verb phrases (`ACTS`, `INSTR`, `ROUT` with `{my}`, `JOBV`), `SK8` skills/talents, `FUN`, `WEATHER`, `DAYS`, `TIMES`. Slovak comes from the sibling's word list; accusative and gender drive Slovak sentences.
- **Persons**: `PR` (Slovak forms), `PS` subject objects `{en, agr, sk, ci, g}`; nouns can be subjects too (`ASG`/`APL` animals, `JOBS`, `PLAYERS`, `EACH`) and agree like their `agr` pronoun. `ci` indexes Slovak present-tense strings "ja,ty,on,my,oni" (`cj`). Slovak helpers `skV`, `skVP`, `skAsk`.
- **Sentence engine**: `sent(aux,s,P,form)` for aux do / can / be / was / got; `bads` (three wrong versions), `gapOf` (the gap), `shortA`/`shortWr` (short answers and wrong ones).
- **`F(c)` factory** builds most topics from `aux, subs, objs, xs, pred, sk, fact, t3|t3s, wh, clue, …`. `fact` returns true/false (known fact decides + / − and the short answer), null (combination not used) or undefined (free, polarity random, ✔/✘ clue shown). Step-3 kinds: `short`, `flip`, `wh` (answer a question-word question; questions about I are asked with you), `person` (change the subject).
- **Hand-made topics** (`T_CAN`, `T_OURS`, `T_WOULD`, `T_DIFF`, `C_*`) implement `rnd()`/`gen(par)` themselves; `vary`/`fix` give listening distractors. **`WFT(c)`** builds Writing-focus topics from `make()` → `{en, sk, q?, gap, wr}`; their typed answers are checked strictly (`strictOk`: capitals, end mark, commas).
- `gen(par)` returns `{en, sk, gap:{txt,a,opts,full?,sk?}, t3:{task,q,hint,clue,scene,a,opts,say}, alts?, ya?, na?, ans?, scene?, w?}`. `scene` is a text picture (vehicles in a row, bars for longer/bigger, weather emoji); `w` replaces the write step with "type the short answer".
- **`UNITS`**: per unit 6 lesson objects (topics, words, titles from the scans, story + wellbeing, project text + example topics). `T.src` and `T.unit` are filled in from it. `TOPICS` = all topics.
- **UI**: `drawPick` (unit, lesson, topic chips), `drawRail` (6 steps), `rule`, `drill` (steps 2–6 and mixed rounds), `storyCard`, `projectCard`, `reviewSetup`, `finale`.

Grammar decisions to keep: with plain *have* the negative is **don't/doesn't have** (the user's first brief wrote "I haven't / she hasn't"); "I haven't" is taught only with *got*.

## Versioning and releasing

Same as the sibling: bump `APP_VERSION` and add a Slovak CHANGELOG entry in `version.js`, commit, annotated tag `vX.Y.Z`, push with `--follow-tags`, `gh release create`. Current version: **1.0.2** (released 2026-11-05).

## Testing (Windows, Git Bash)

- git: `/c/Program Files/Git/cmd/git`, gh: `/c/Program Files/GitHub CLI/gh.exe` (not on PATH). No Node; Python 3.10 (`python -I`).
- Copy the site to the scratchpad, inject a `<script>` before `</body>` that writes into `<pre id="TESTLOG">`, run headless Edge (`/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe --headless=new --dump-dom --virtual-time-budget=8000 file:///…`). Checks that caught real bugs: for every topic in `TOPICS` generate ~300 items and assert no "undefined", the answer is among unique options, `listenOpts` gives 4 distinct sentences, sentences end with . ? !, no double spaces; then click through every unit × lesson × topic (6 steps), the story/project rounds and a review round, watching `window.onerror` and any visible "null"/"undefined" text. Also read a sample of generated sentences for grammar and meaning (e.g. "What do dolphins eat?" had no true answer). Screenshots: `--screenshot --window-size=420,1500` (headless Edge has a ~492px minimum width, so the right edge looks cut off).
- When patching app.js from Python, use raw strings: `"\b"` in a normal string becomes a backspace character inside a JS regex.
