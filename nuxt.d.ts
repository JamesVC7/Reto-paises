// nuxt.d.ts
import { NuxtConfig } from 'nuxt/schema'
import { ApolloClientConfig } from '@nuxtjs/apollo'

declare module 'nuxt/schema' {
  interface NuxtConfig {
    apollo?: ApolloClientConfig
  }
}

export { }
