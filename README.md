## Combine HTML [![Build Status](https://travis-ci.org/julesbou/combine-html.svg?branch=master)](https://travis-ci.org/julesbou/combine-html)

Combine HTML templates in a JavaScript file

```bash
npm install combine-html
```

## Cli

```bash
npm install combine-html -g

combine-html -h

combine-html templates/**/*.html > templates.js
# {'templates/template.html': '<template content>'}

combine-html templates/**/*.html --root templates/ > templates.js
# {'template.html': '<template content>'}

combine-html templates/**/*.html --amd > templates.js
# define(function() { return {"templates/template.html": "<template content>"}; });

combine-html templates/**/*.html --commonJS > templates.js
# module.exports = {"templates/template.html": "<template content>"};

combine-html templates/**/*.html --es2015 > templates.js
# export default {"templates/template.html": "<template content>"};

combine-html templates/**/*.html --global myVar > templates.js
# var myVar = {"templates/template.html": "<template content>"};
```

## Usage

`combine()` returns a JavaScript Promise:

```js
const combine = require('combine-html')

combine('templates/template.html', {})
combine('templates/template.html', { root: 'templates/' })
combine('templates/template.html', { amd: true })
combine('templates/template.html', { commonJS: true })
combine('templates/template.html', { es2015: true })
combine('templates/template.html', { global: 'myVar' })
```

You can use any directory pattern recognized by [`node-glob`](https://github.com/isaacs/node-glob#glob-primer), so
for example:

```js
// match all .html files in all directories (sub-directories included)
combine('templates/**/*.html', {})
```
