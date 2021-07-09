'use strict'

const Cmd = require('commander').program

Cmd.option('-t, --title <title>', 'PR Title')

Cmd.command('pkg').action(() => print(extractPackage(Cmd.opts().title)))
Cmd.command('from').action(() => print(extractFromVersion(Cmd.opts().title)))
Cmd.command('to').action(() => print(extractToVersion(Cmd.opts().title)))
Cmd.command('type-and-scope').action(() => print(extractCommitTypeAndScope(Cmd.opts().title)))

const extractPackage = title => title.substring(title.indexOf(': bump ') + 7, title.indexOf(' from ')).trim()
const extractFromVersion = title => title.substring(title.indexOf(' from ') + 5, title.indexOf(' to ')).trim()
const extractToVersion = title => title.substring(title.indexOf(' to ') + 3, title.length).trim()
const extractCommitTypeAndScope = title => title.substring(0, title.indexOf('):') + 1).trim()

const print = value => {
  process.stdout.write(value)
}

Cmd.parse(process.argv)
