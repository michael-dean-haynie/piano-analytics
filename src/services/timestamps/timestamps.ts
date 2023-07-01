// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  timestampDataValidator,
  timestampPatchValidator,
  timestampQueryValidator,
  timestampResolver,
  timestampExternalResolver,
  timestampDataResolver,
  timestampPatchResolver,
  timestampQueryResolver
} from './timestamps.schema'

import type { Application } from '../../declarations'
import { TimestampService, getOptions } from './timestamps.class'
import { timestampPath, timestampMethods } from './timestamps.shared'
import type { HookContext } from "@feathersjs/feathers";

export * from './timestamps.class'
export * from './timestamps.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const timestamp = (app: Application) => {
  // Register our service on the Feathers application
  app.use(timestampPath, new TimestampService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: timestampMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(timestampPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(timestampExternalResolver),
        schemaHooks.resolveResult(timestampResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(timestampQueryValidator),
        schemaHooks.resolveQuery(timestampQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(timestampDataValidator),
        schemaHooks.resolveData(timestampDataResolver)
      ],
      patch: [
        schemaHooks.validateData(timestampPatchValidator),
        schemaHooks.resolveData(timestampPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [timestampPath]: TimestampService
  }
}
