#!/usr/bin/env node
'use strict'

const npmSelfLink = require('..')

npmSelfLink().then(
  ({ pkgName }) => {
    console.log(`Successfully made a self npm link to: ${pkgName}.`)
  },
  err => {
    console.error(err)
    process.exit(1)
  }
)
