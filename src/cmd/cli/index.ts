#!/usr/bin/env ts-node

import '../../utils/ts/fix-paths-mapping'
import Package from '../../../package.json'
import { program as Cmd } from 'commander'
import { encode } from '@app/utils/encoding/base64'

const argv = process.argv
if (argv.length <= 2) argv.push('--help')

Cmd.name(Package.name).version(Package.version)

Cmd.command('version')
  .description('Get current application version described in package.json > "version" field')
  .action(() => print(Package.version))

Cmd.command('enc-base64 <value>')
  .description('Encode value to Base 64')
  .action(value => print(encode(value)))

function print(value: string): void {
  process.stdout.write(value)
}

Cmd.parse(argv)
