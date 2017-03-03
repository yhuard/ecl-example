# ECL example

[![Build Status](https://travis-ci.org/yhuard/ecl-example.svg?branch=master)](https://travis-ci.org/yhuard/ecl-example)

Requirements:
-   Node.js >= 6.9.5
-   yarn >= 0.20.3 (recommended) or npm >= 3.x.x (tested with npm 3.10.10)

## Setup

```bash
# with yarn
yarn
# or if you prefer npm
npm install
```

## Build for development

```bash
# with yarn
yarn start
# or if you prefer npm
npm start
```

If you don't want to use the integrated change watcher, you can also just run:

```bash
# with yarn
yarn build
# or if you prefer npm
npm run build
```

## Build for production use

```bash
# with yarn
yarn dist
# or if you prefer npm
npm run dist
```

## Lint

```bash
# with yarn
yarn lint
# or if you prefer npm
npm run lint
```

## Make a new release

```bash
# with yarn
yarn release
# or if you prefer npm
npm run release
```

This will generate the changelog notes, update the version number in `package.json`
and create a new tag (without pushing it).

If you're happy with what has been generated, you can now run:

```bash
git push --follow-tags origin master
```

## Deploy the release to GitHub with Travis

First, [create a GitHub token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). The scopes for the token you need is public_repo or repo (if you need to access private repos). Add the `RELEASE_TOKEN`
environment variable to your Travis project.

Then, on every new tag, a GitHub release will automatically be created.
