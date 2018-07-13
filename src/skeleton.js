'use strict'

var magic = {
  dotenv_default_path: '.env',
  indent: 2
}

require('dotenv').config({path: magic.dotenv_default_path})
const lookup = require('../data/lookup.json')

const debug = (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') || false

module.exports.handler = (event, context, callback) => {
  debug && console.log(
    'Event data: ', JSON.stringify(event, null, magic.indent),
    '. Context data: ', JSON.stringify(context, null, magic.indent))

  if(lookup.search && lookup.search.hasOwnProperty(event.key)) {
    debug && console.log('key found')
    callback(null, lookup['search'][event.key])
  }

  callback('key not found')
}
