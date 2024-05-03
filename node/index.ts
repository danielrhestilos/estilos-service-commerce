import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service , Cached} from '@vtex/api'
import { validateIntentoProps } from './middlewares/validateIntento'
import { validateRegistrosProps } from './middlewares/validateRegistros'
import { Clients } from './clients'

const TIMEOUT_MS = 3000
const CONCURRENCY = 10


const memoryCache = new LRUCache<string, any>({ max: 5000 })

const tenantCacheStorage = new LRUCache<string, Cached>({
  max: 3000
})

const segmentCacheStorage = new LRUCache<string, Cached>({
  max: 3000
})

metrics.trackCache('tenant', tenantCacheStorage)
metrics.trackCache('segment', segmentCacheStorage)


metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
// We pass our custom implementation of the clients bag, containing the Status client.
implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      exponentialTimeoutCoefficient: 2,
      exponentialBackoffCoefficient: 2,
      initialBackoffDelay: 50,
      retries: 5,
      timeout: TIMEOUT_MS,
      concurrency: CONCURRENCY,
    },
    tenant: {
      memoryCache: tenantCacheStorage,
      timeout: TIMEOUT_MS
    },
    segment: {
      memoryCache: segmentCacheStorage,
      timeout:  TIMEOUT_MS
    },
    events: {
      timeout: TIMEOUT_MS
    },
    vbase: {
      concurrency: 5,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    // status: {
    //   memoryCache,
    // },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    id: number
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    validateIntento:method({
      PUT: [validateIntentoProps]
    }),
    validateRegistros:method({
      PUT: [validateRegistrosProps]
    })
  },
})
