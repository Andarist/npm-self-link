#!/usr/bin/env node
'use strict'

const npmSelfLink = require('..')

npmSelfLink().then(
  ({ pkgName, newlyLinked }) => {
    if (newlyLinked) {
      console.log(`Successfully self-linked package '${pkgName}'`)
    } else {
      console.log(`Using existing link for package '${pkgName}'`)
    }
  },
  err => {
    console.error(err)
    process.exit(1)
  }
)
