## Combine HTML [![Build Status](https://travis-ci.org/julesbou/combine-html.svg?branch=master)](https://travis-ci.org/julesbou/combine-html)

Combine HTML templates in a JavaScript file

```
npm install combine-html
```

## Usage

```js
const combine = require('combine-html')

combine('html/template.html', {}, function(combined) {
  // {'html/template.html': '<template content>'}
})

combine('html/template.html', { root: 'html/' }, function(combined) {
  // {'template.html': '<template content>'}
})

combine('html/template.html', { amd: true }, function(combined) {
  // 'define(function() { return {"html/template.html": "<template content>"}; });'
})

combine('html/template.html', { commonJS: true }, function(combined) {
  // 'module.exports = {"html/template.html": "<template content>"};'
})

combine('html/template.html', { es2015: true }, function(combined) {
  // 'export default {"html/template.html": "<template content>"};'
})

combine('html/template.html', { global: 'myVar' }, function(combined) {
  // 'var myVar = {"html/template.html": "<template content>"};'
})
```

You can use any directory pattern recognized by [`node-glb`](https://github.com/isaacs/node-glob#glob-primer), so
for example:

```js
// match all .html files in all directories (sub-directories included)
combine('html/**/*.html', {}, function(combined) { ... })
```
