// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const timestampSchema = Type.Object(
  {
    id: Type.Number(),
    timestamp: Type.String({ format: 'date-time'})
  },
  { $id: 'Timestamp', additionalProperties: false }
)
export type Timestamp = Static<typeof timestampSchema>
export const timestampValidator = getValidator(timestampSchema, dataValidator)
export const timestampResolver = resolve<Timestamp, HookContext>({})

export const timestampExternalResolver = resolve<Timestamp, HookContext>({})

// Schema for creating new entries
// export const timestampDataSchema = Type.Pick(timestampSchema, ['timestamp'], {
//   $id: 'TimestampData'
// })
export const timestampDataSchema = Type.Object(
  {
    msOffset: Type.Number()
  },
  { $id: 'TimestampData' }
)
export type TimestampData = Static<typeof timestampDataSchema>
export const timestampDataValidator = getValidator(timestampDataSchema, dataValidator)
export const timestampDataResolver = resolve<Timestamp, HookContext>(
  {
    id: async () => undefined
  },
  {
    converter: async (rawData, context) => {
      return {
        timestamp: new Date(Date.now() - rawData.msOffset).toISOString(),
        id: 0 // will get removed by property resolver
      }
    }
  }
)

// Schema for updating existing entries
export const timestampPatchSchema = Type.Partial(timestampSchema, {
  $id: 'TimestampPatch'
})
export type TimestampPatch = Static<typeof timestampPatchSchema>
export const timestampPatchValidator = getValidator(timestampPatchSchema, dataValidator)
export const timestampPatchResolver = resolve<Timestamp, HookContext>({})

// Schema for allowed query properties
export const timestampQueryProperties = Type.Pick(timestampSchema, ['id', 'timestamp'])
export const timestampQuerySchema = Type.Intersect(
  [
    querySyntax(timestampQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TimestampQuery = Static<typeof timestampQuerySchema>
export const timestampQueryValidator = getValidator(timestampQuerySchema, queryValidator)
export const timestampQueryResolver = resolve<TimestampQuery, HookContext>({})
