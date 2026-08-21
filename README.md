# Your Move, Prime Minister

A playable simulation of running the UK government. Five years, twenty quarters,
and a decision on your desk every one of them.

**Play:** https://danieljohnsonxyz.github.io/your-move-prime-minister/

## The loop

Each quarter runs the same three beats:

1. **Briefing** — two or three things want an answer. One is urgent. Your three
   manifesto promises sit underneath, marked on track, at risk or off track.
2. **Decide** — an issue opens as one card: what happened, what your Chancellor
   thinks, what a second adviser thinks (they often disagree), and three or four
   responses with their likely consequences shown as ranges rather than
   certainties. Every decision costs action points, and you only get three.
3. **Consequences** — running the quarter always interrupts with a report: what
   moved, which earlier decisions have started to land, what got worse because
   you left it, and what the papers made of it.

Most policy takes a year or more to reach people, so the decision that wins or
loses the election is usually one you made long before it.

## Running it

No build step, no dependencies.

```
# open directly
open index.html

# or serve it
npx http-server .
```

Publish directory is the repository root; entry file is `index.html`.

## Layout

```
index.html      the shell: header, nav, one section per screen
styles.css      one stylesheet
js/content.js   the event library, briefings and scheduling metadata
js/engine.js    the simulation — state, turns, votes, promises, saving
js/ui.js        rendering and interaction
```

`js/engine.js` holds no DOM references and `js/ui.js` holds no game rules, so
the model can be tested without a browser:

```js
Engine.reset();
Engine.setPromises(['nhs', 'housing', 'growth'], []);
Engine.beginTerm();
Engine.decide('nhs_strike', 0);
Engine.endTurn();   // returns the quarter's report
```

## Saving

Your term saves to `localStorage` after every decision and every quarter, and
the title screen offers to continue it. Nothing is uploaded anywhere.
