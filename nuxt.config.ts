// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from 'nuxt/config'
import apolloConfig from './apollo.config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
    "nuxt-graphql-request"
  ],
  apollo: apolloConfig,
  devtools: { enabled: false },
  css: [
    'primeicons/primeicons.css',
    'primevue/resources/themes/lara-light-blue/theme.css',
    'assets/css/tailwind.css'
     
  ],
})