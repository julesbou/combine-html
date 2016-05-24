## Combine HTML [![Build Status](https://travis-ci.org/julesbou/combine-html.svg?branch=master)](https://travis-ci.org/julesbou/combine-html)

Combine HTML templates in a JavaScript file

```bash
npm install combine-html
```

## Motivation

There's already lots of tools allowing you to combine html files into a single one,
but they all depend on grunt or gulp or webpack or requirejs or browserify...
My need was to combine those html files with one simple command and nothing more.

## Cli

```bash
npm install combine-html -g
combine-html -h

combine-html templates/**/*.html > templates.js
combine-html templates/**/*.html --root templates/ > templates.js
combine-html templates/**/*.html --amd > templates.js
combine-html templates/**/*.html --commonJS > templates.js
combine-html templates/**/*.html --es2015 > templates.js
combine-html templates/**/*.html --global myVar > templates.js
```

## Node

`combine()` returns a JavaScript Promise:

```js
const combine = require('combine-html')

combine('templates/**/*.html')
combine('templates/**/*.html', { root: 'templates/' })
combine('templates/**/*.html', { amd: true })
combine('templates/**/*.html', { commonJS: true })
combine('templates/**/*.html', { es2015: true })
combine('templates/**/*.html', { global: 'myVar' })
```

You can use any directory pattern recognized by [`node-glob`](https://github.com/isaacs/node-glob#glob-primer).
