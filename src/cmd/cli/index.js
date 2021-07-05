#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const Package = require('../../../package.json')
const Commander = require('commander').program

const argv = process.argv
if (argv.length <= 2) argv.push('--help')

Commander.name(Package.name).version(Package.version)

Commander.command('version')
  .description('Get current application version described in package.json > "version" field')
  .action(() => process.stdout.write(Package.version))

Commander.parse(argv)
