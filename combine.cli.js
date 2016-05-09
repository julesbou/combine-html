#!/usr/bin/env node

var program = require('commander')
var combine = require('./combine')

program
  .arguments('<dest>')
  .option('--root <root>')
  .option('--amd')
  .option('--commonJS')
  .option('--es2015')
  .option('--global <global>')
  .action(function(dest) {
    combine(dest, program.opts()).then(function(combined) {
      process.stdout.write(combined)
    })
  })
  .parse(process.argv)
