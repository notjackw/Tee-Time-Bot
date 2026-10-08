# Tee Time Bot

A bot for automating tee time booking on CPS Golf booking sites (e.g. George Wright Golf Course).

## Status

Early exploration stage. [explore.js](explore.js) uses [Playwright](https://playwright.dev/) to probe `georgewright.cps.golf`: it loads the site, logs any `/api/` calls and cookies set (including anti-bot "clearance" cookies), then reloads to see how behavior changes once a clearance cookie is present.

## Setup

```bash
npm install
```

## Usage

```bash
node explore.js
```

Runs a visible (non-headless) browser session against the target site and prints captured API calls, cookies, and page text to the console.
