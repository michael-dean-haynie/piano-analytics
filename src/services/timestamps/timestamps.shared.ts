// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Timestamp,
  TimestampData,
  TimestampPatch,
  TimestampQuery,
  TimestampService
} from './timestamps.class'

export type { Timestamp, TimestampData, TimestampPatch, TimestampQuery }

export type TimestampClientService = Pick<
  TimestampService<Params<TimestampQuery>>,
  (typeof timestampMethods)[number]
>

export const timestampPath = 'timestamps'

export const timestampMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const timestampClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(timestampPath, connection.service(timestampPath), {
    methods: timestampMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [timestampPath]: TimestampClientService
  }
}
