#!/usr/bin/env node

import 'dotenv/config'
import 'newrelic'

import { provideConfig } from './config/provideConfig'
import { GraphQLServer } from './GraphQLServer'
import { Logger } from './utils/log/Logger'
import { EnvConfigurationsFactory } from './config/env/EnvConfigurationsFactory'
import { attachToTerminationEvents } from './utils/runtime/attachToTerminationEvents'

const config = provideConfig(new EnvConfigurationsFactory())
const server = new GraphQLServer(config)

attachToTerminationEvents(server.close)

process.on('uncaughtException', error => Logger.error(error))
process.on('warning', warning => Logger.warn(warning))
process.on('unhandledRejection', (reason, promise) =>
  Logger.warn(`Unhandled rejection at: ${promise}. Reason: ${reason}`)
)

if (!config.runtime.isProd)
  Logger.info(`
  ____                                       ____                 _      ___  _
 / ___|___  _ __   __ _ _ __ ___  ___ ___   / ___|_ __ __ _ _ __ | |__  / _ \\| |
| |   / _ \\| '_ \\ / _\` | '__/ _ \\/ __/ __| | |  _| '__/ _\` | '_ \\| '_ \\| | | | |
| |__| (_) | | | | (_| | | |  __/\\__ \\__ \\ | |_| | | | (_| | |_) | | | | |_| | |___
 \\____\\___/|_| |_|\\__, |_|  \\___||___/___/  \\____|_|  \\__,_| .__/|_| |_|\\__\\_\\_____|
                  |___/                                    |_|
`)

server
  .buildAndStart()
  .then(() => Logger.debug('server initialization complete'))
  .catch(err => Logger.fatal(err, 'server crashed. reason: ' + err.message))
