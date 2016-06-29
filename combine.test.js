"use strict"

const assert = require('chai').assert
const combine = require('./combine.js')

describe('combine', function() {

  it('combine', function(done) {
    combine('test-fixtures/**.html').then(function(combined) {
      assert.deepEqual(combined,
       JSON.stringify({
         "test-fixtures/quote.html":"<h1 class=\"attr\">Hello</h1><p class='attr'>Ipsum</p>",
         "test-fixtures/simple.html":"<h1>Hello</h1><p>Dolor</p>"
       })
      )
      done()
    })
  })

  it('root', function(done) {
    combine('test-fixtures/simple.html', { root: 'test-fixtures/' }).then(function(combined) {
      assert.deepEqual(combined, JSON.stringify({"simple.html":"<h1>Hello</h1><p>Dolor</p>"}))
      done()
    })
  })

  it('amd', function(done) {
    combine('test-fixtures/simple.html', { amd: true }).then(function(combined) {
      assert.equal(combined, 'define(function() { return {"test-fixtures/simple.html":"<h1>Hello</h1><p>Dolor</p>"}; });')
      done()
    })
  })

  it('commonJS', function(done) {
    combine('test-fixtures/simple.html', { commonJS: true }).then(function(combined) {
      assert.equal(combined, 'module.exports = {"test-fixtures/simple.html":"<h1>Hello</h1><p>Dolor</p>"};')
      done()
    })
  })

  it('es2015', function(done) {
    combine('test-fixtures/simple.html', { es2015: true }).then(function(combined) {
      assert.equal(combined, 'export default {"test-fixtures/simple.html":"<h1>Hello</h1><p>Dolor</p>"};')
      done()
    })
  })

  it('global', function(done) {
    combine('test-fixtures/simple.html', { global: 'myVar' }).then(function(combined) {
      assert.equal(combined, 'var myVar = {"test-fixtures/simple.html":"<h1>Hello</h1><p>Dolor</p>"};')
      done()
    })
  })
})
