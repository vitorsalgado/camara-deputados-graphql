#!/usr/bin/env node

'use strict'

/**
 * @module Script: Copy GraphQL Schemas
 * @description Recursively copies all GraphQL schemas to the build directory keeping the folder structure.
 */

const Pino = require('pino')
const Globby = require('globby')
const FsExt = require('fs-extra')

const Logger = Pino({
  level: 'info',
  prettyPrint: {
    colorize: true,
    messageFormat: '{msg}',
    ignore: 'hostname,time,pid'
  }
})

;(async function () {
  Logger.info('Copying GraphQL Schemas to build directory ...\n')

  const criteria = 'src/**/*.graphql'
  const schemaRefs = await Globby(criteria, {
    cwd: process.cwd(),
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**']
  })

  for (const schemaRef of schemaRefs) {
    const schema = schemaRef.substring(schemaRef.lastIndexOf('/') + 1, schemaRef.length)
    Logger.info(`Schema: ${schema}`)
    Logger.info(`Schema Dir: ${schemaRef}`)

    const path = schemaRef.substring(0, schemaRef.lastIndexOf('/'))
    const distPath = path.replace('src/', 'dist/')
    const newRef = schemaRef.replace('src/', 'dist/')

    Logger.info(`Ensuring the path exists and copying schema ...\n`)
    FsExt.mkdirpSync(distPath)
    FsExt.copySync(schemaRef, newRef)
  }

  Logger.info('Done Copying GraphQL Schemas. Exiting ...')
})()
