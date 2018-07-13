'use strict'

const assert = require('assert')
const async = require('async')
const expect = require('chai').expect
const nock = require('nock')
const skeleton_function = require('../src/skeleton')

var magic = {
  context: {},
  dotenv_path: '.env',
  empty_length: 0,
  test_timeout: 5000
}

const debug = (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') || false

require('dotenv').config({path: magic.dotenv_path})

describe('Santity test', function() {
  it('Assert True', function() {
    assert.ok(true)
  })
})

const test_data = require('./data.json')

async.forEach(test_data.scenarios, function (scenario) {
  describe(scenario.title, function() {
    async.forEach(scenario.test_cases, function (test_case) {

      let invoke_data = test_case.invoke_data

      debug && console.log('disable net access via nock')
      nock.disableNetConnect()

      it(test_case.description, function(done) {
        skeleton_function.handler(invoke_data, magic.context, (error, result) => {
          switch (test_case.evaluation) {
            case 'success':
              expect(error).to.not.exist
              expect(result).to.exist
              expect(result).deep.equal(test_case.expected_result)
              done()
              break
            case 'failure':
              expect(result).to.not.exist
              expect(error).to.exist
              expect(error).deep.equal(test_case.expected_result)
              done()
              break
            default:
              done('Evaluation not found')
          }
        })
      })
    })
  })
})
