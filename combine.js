'use strict'

const fs = require('fs')
const async = require('async')
const glob = require('glob')

module.exports = function(dest, opts, callback) {
  let json = {}

  glob(dest, (err, files) => {
    if (err) throw err
    async.each(files , (file, next) => {
      fs.readFile(file, 'utf-8', (err, content) => {
        if (err) throw err
        json[convertFileName(file)] = convertFileContent(content)
        next()
      })
    }, () => callback(wrap(json)))
  })

  function convertFileName(file) {
    return opts.root ? file.replace(opts.root, '') : file
  }

  function convertFileContent(content) {
    return String(content)
      .replace( /\s[\r\n ]+/g, '' ) // remove new lines
      .replace(/>\s+</g, '><')      // remove whitespaces between tags
      .replace(/\n$/, '')           // line ending
  }

  function wrap(json) {
    if (opts.amd) {
      return `define(function() { return ${JSON.stringify(json)}; })`
    }
    else if (opts.commonJS) {
      return `module.exports = ${JSON.stringify(json)};`
    }
    else if (opts.es2015) {
      return `export default ${JSON.stringify(json)};`
    }
    else if (opts.global) {
      return `var ${opts.global} = ${JSON.stringify(json)};`
    }
    return json
  }
}