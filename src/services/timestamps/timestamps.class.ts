// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Timestamp, TimestampData, TimestampPatch, TimestampQuery } from './timestamps.schema'

export type { Timestamp, TimestampData, TimestampPatch, TimestampQuery }

export interface TimestampParams extends KnexAdapterParams<TimestampQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TimestampService<ServiceParams extends Params = TimestampParams> extends KnexService<
  Timestamp,
  TimestampData,
  TimestampParams,
  TimestampPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'timestamps'
  }
}
