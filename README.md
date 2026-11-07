# Cyber Trainer

A local study app for Cybersecurity in Software Engineering. It teaches the theory of secure software development and then tests your knowledge with a robust question bank, so you can see gaps in your understanding before moving on. It is built to help you explain secure coding practices confidently in a job interview.

It runs entirely on your own computer. There is no account, no database and no internet
connection needed once it is installed.

## Contents

- [Quick start](#quick-start)
- [What is in the app](#what-is-in-the-app)
- [How to study with it](#how-to-study-with-it)
- [Where your progress is saved](#where-your-progress-is-saved)
- [Sharing this project with someone else](#sharing-this-project-with-someone-else)
- [Adding a new day](#adding-a-new-day)
- [Content format reference](#content-format-reference)
- [Project structure](#project-structure)
- [Commands](#commands)
- [Troubleshooting](#troubleshooting)
- [Notes on the content](#notes-on-the-content)

## Quick start

You need **Node.js 18 or newer** (check with `node -v`) and **npm**, which comes with Node.
Get Node from <https://nodejs.org> if you do not have it.

```
cd cyber-trainer
npm install
npm run dev
```

Open the address that Vite prints, usually <http://localhost:5173>. Leave the terminal window open
while you study. Stop the app with `Ctrl+C`.

If you are on Windows, run these commands in PowerShell, Command Prompt or the VS Code terminal.

## What is in the app

The app currently holds **Days 1 to 20** (586 questions). Each day has:

| Tab | What it does |
| --- | --- |
| **Learn** | The theory, in short sections with code examples where they help. Each section ends with an interview-ready line ("What to say"). "Beyond the course" notes add current facts, corrections and extra depth that the course does not cover. |
| **Drill** | Multiple choice questions. Every answer shows why it is right or wrong. Your score is saved per question. |
| **Match & order** | Matching sets (pair terms with definitions) and ordering exercises (put steps in the right sequence). |
| **Explain it** | Open questions. Answer from memory, reveal the model answer, then mark yourself honestly as "nailed it" or "need to revisit". |

| Day | Topic |
| --- | --- |
| 1 | Developers and security |
| 2 | Core principles |
| 3 | Risks and threat modelling |
| 4 | Standards and frameworks |
| 5 | Ethical responsibility |
| 6 | Why secure coding matters |
| 7 | DevSecOps evolution |
| 8 | Secure SDLC and developer responsibilities |
| 9 | Secure SDLC: planning and analysis |
| 10 | Secure SDLC: design |
| 11 | SDLC implementation phase |
| 12 | Secure input handling and validation |
| 13 | Error handling, logging and secrets |
| 14 | Secure dependencies and package management |
| 15 | Static and dynamic code analysis (SAST and DAST) |
| 16 | Secure SDLC: verification phase |
| 17 | Secure testing tools and CI integration |
| 18 | Maintenance and continuous assurance |
| 19 | Policy as Code and infrastructure security |
| 20 | Secure vibe coding (AI coding assistants) |

### How "mastery" is scored

Each lesson has a mastery percentage:

```
mastery = 60% drill score + 20% matching and ordering + 20% explain-it
```

A lesson shows as **Ready** only when all of these are true:

- the drill score is at least **85%**,
- every matching and ordering set has been completed, and
- at least **80%** of the explain-it questions are marked as nailed.

The home page shows your overall progress and how many lessons are ready.

## How to study with it

1. Read the **Learn** tab for the day. Do not skip the "Beyond the course" notes.
2. Do the **Drill** without looking at the theory. Wrong answers are the useful ones, so read why.
3. Complete the **Match & order** sets.
4. In **Explain it**, say your answer out loud or write it down **before** you reveal the model
   answer. That is the closest thing to an interview.
5. Go back to any topic where you scored below 85%, then repeat the drill.
6. Do not move on to the next day until the current one shows **Ready**.

## Where your progress is saved

Your progress is stored in a file inside the project, so it survives restarts and browser changes.

- **File:** `data/progress.json`. It loads automatically each time you start the app.
- **Autosave:** about 0.7 seconds after every answer, and again when you close or hide the tab.
- **Save now button:** in the sidebar. It saves immediately and shows the time of the last save.
- **Backups:** `data/backups/` holds one snapshot per day, plus one taken just before any reset.
  The newest 40 are kept.
- **Undo a reset:** stop the app, copy the snapshot you want over `data/progress.json`, and start again.
- **Browser fallback:** progress is also kept in your browser's `localStorage`
  (key `cyber-trainer-v1`), so nothing is lost if the file cannot be written.

The file is written by a tiny server inside the Vite dev server (`vite-progress-plugin.js`).
That is why you should use `npm run dev` (or `npm run preview`) and not open `index.html` directly.
If you serve the built `dist/` folder from some other web server, there is no file saving and the
app falls back to browser storage only.

### Moving your progress to another computer

Copy the `data/` folder (or just `data/progress.json`) into the same place in the project on the new
computer, then start the app. The progress loads automatically.

### Privacy and safety

- The server only accepts saves from the same origin as the page, which blocks other websites from
  writing to your progress file.
- Run the app only on your own machine. Do **not** start it with `--host` on a shared or public
  network, because the progress endpoint would then be reachable by other devices on that network.
- `data/progress.json` is personal. Do not commit it to a public repository.

## Sharing this project with someone else
**Important note on content**: While the codebase of this project is shared openly, the specific lesson content and questions in the src/content/ folder may be based on proprietary educational materials. If you are publishing this repository publicly, ensure you have the rights to share the study materials. The app is designed so you can easily swap out the content files for your own notes.

Before you zip or push the project:

1. **Do not include your progress.** Leave out `data/progress.json` and `data/backups/`.
   If you use Git, add these lines to `.gitignore`:
   ```
   data/progress.json
   data/backups/
   ```
2. **Leave out `node_modules/` and `dist/`.** They are large and are recreated by `npm install`.
3. Tell them to follow [Quick start](#quick-start). They start with a clean slate and their own progress.



## Adding a new day

Every day is one file in `src/content/`. The easiest way is to copy the most recent day and replace
its content.

1. Copy the latest file, for example `src/content/day20.js`, to `src/content/day21.js`.
2. Change `id` and `day` to `21`, and update `short` (the sidebar name), `title` and `outcome`.
3. Replace the `theory`, `qs`, `match`, `order` and `open` content with the new lesson.
4. Open `src/content/index.js`, then:
   - add `import day21 from "./day21.js";`,
   - add `day21` to the end of the `LESSONS` array, and
   - set `LOCKED` to `[22]` (the next day number that is not added yet).
5. Restart `npm run dev` if it was running. Your saved progress is kept, because it is stored by question
   id and the ids of older days do not change.

**Do not renumber or reorder existing questions** in a day you have already studied. Progress is stored
against each question's position (`day id + "q" + index`), so inserting a question in the middle shifts
the saved answers for the questions after it. Add new questions at the end of the `qs` array.

Aim for about 25 to 30 multiple choice questions per day, three to five matching sets, one ordering
set where a sequence exists, and five to seven explain-it questions with model answers.

## Content format reference

```js
import { Q, M, E, O } from "../lib/helpers.js";

export default {
  id: 21, day: 21,
  short: "Short sidebar name",
  title: "Full lesson title",
  outcome: "What you should be able to do after this lesson.",

  theory: [
    {
      h: "Section heading",
      p: ["A paragraph.", "Another paragraph."],
      bullets: ["**Bold lead**: an item", "Another item"],
      code: "print('a code block')",
      beyond: "A note about things outside the course.",
      say: "An interview-ready line."
    }
  ],

  qs: [
    Q("Topic", "Question?", "The correct answer", ["Wrong 1", "Wrong 2", "Wrong 3"], "Why it is correct.")
  ],

  match: [
    M("Set title", "Short instruction.", [["Term", "Definition"], ["Term 2", "Definition 2"]])
  ],

  order: [
    O("Set title", "Short instruction.", ["First step", "Second step", "Third step"])
  ],

  open: [
    E("Explain-it question?", ["Model answer point 1", "Model answer point 2"], "Optional tip")
  ]
};
```

Rules and tips:

- Every theory section needs at least one of `p`, `bullets` or `code`.
- Inline formatting works in text: `**bold**` and `` `code` ``.
- `Q` needs exactly three wrong answers. Keep the wrong answers believable and similar in length to
  the right one, so the correct answer is not obvious from its shape.
- `M` sets work best with 4 to 8 pairs. Definitions may repeat, which suits "classify each item" sets such as `Yes` or `Vulnerability`.
- `O` items are written in the correct order. The app shuffles them for you.
- Text in `code` blocks is shown exactly as written. Escape backticks inside template literals.

## Project structure

```
cyber-trainer/
├── data/                      your saved progress (created automatically)
│   ├── progress.json
│   └── backups/
├── src/
│   ├── content/
│   │   ├── day1.js … day20.js one file per lesson
│   │   └── index.js           list of days and the LOCKED marker
│   ├── lib/helpers.js         Q, M, E and O helper functions
│   ├── App.jsx                all the React components
│   ├── main.jsx               entry point
│   └── styles.css             light and dark theme (follows your system setting)
├── vite-progress-plugin.js    tiny server that reads and writes data/progress.json
├── vite.config.js
├── index.html
└── package.json
```

Technology: React 18 and Vite 5. Components are written with `React.createElement` (shortened to `h`)
instead of JSX tags, so the code has no special syntax to learn.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs the dependencies. Run it once, and again if `package.json` changes. |
| `npm run dev` | Starts the app with live reload and progress saving. |
| `npm run build` | Builds a static copy into `dist/`. Used to check that the project compiles. |
| `npm run preview` | Serves the built `dist/` folder, with progress saving still working. |

## Troubleshooting

**`npm: command not found` or `node: command not found`**
Install Node.js from <https://nodejs.org> and open a new terminal.

**The page does not open or shows "port in use"**
Another program is using port 5173. Vite will normally pick the next free port and print it. Use the
address it prints, or stop the other program.

**The sidebar says "Could not save to data/progress.json"**
The app cannot write to the `data/` folder. Check that the folder exists and is not read-only, that your
antivirus or a cloud-sync tool is not locking it, and that the app is running through `npm run dev`.
Press **Save now** to retry. Your answers are still kept in the browser meanwhile.

**My progress disappeared**
- Make sure you started the app from the same project folder as before, because each folder has its own `data/`.
- Check `data/backups/` for a snapshot and copy it over `data/progress.json` while the app is stopped.
- If you reset on purpose, a snapshot named `before-reset` was taken first.

**I changed a content file and nothing happened**
Save the file and check the terminal for a syntax error. A typo in a `day*.js` file (a missing comma or
quote) can stop that day from loading.

**The fonts look different offline**
The theme can load web fonts. Without internet it falls back to your system fonts, which is fine.

**`npm install` fails or hangs**
Check your internet connection, delete the `node_modules` folder and `package-lock.json`, and try again.

## Notes on the content

- This is a personal study aid and not an official source. It covers standard cybersecurity principles and adds "Beyond the basics" notes where facts have changed or a point needs care (for example the OWASP Top 10:2025, CVE terminology, and the September 2025 npm supply chain attacks).
- Some concepts are easier explained with representative code examples. Where a specific configuration or snippet was not available, the lesson contains a representative example written for this app to illustrate the concept clearly.
- Tool commands and flags change between versions. Check the official documentation of a tool before you rely on a command in real work.
- If you find a mistake, fix it in the matching src/content/dayN.js file. The format above is all you need.
