'use strict'

const fs = require('fs')
const glob = require('glob')
const async = require('async')

module.exports = function(dest, opts) {
  let json = {}
  opts = opts || {}

  return new Promise((resolve, reject) => {
    glob(dest, (err, files) => {
      if (err) throw err
      async.each(files , (file, next) => {
        fs.readFile(file, 'utf-8', (err, content) => {
          if (err) throw err
          json[convertFileName(file)] = convertFileContent(content)
          next()
        })
      }, () => resolve(wrap(json)))
    })
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
      return `define(function() { return ${JSON.stringify(json)}; });`
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
