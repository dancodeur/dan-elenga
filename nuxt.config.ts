// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    'nuxt-particles',
    'nuxt-typedjs',
    'v-gsap-nuxt',
  ],
  particles: {
    mode: 'full',
    lazy: true
  },
  // vgsap: {
  //   presets: [],
  //   breakpoint: 768,
  //   scroller: '',
  //   composable: true
  // }
  css: [
    '~/assets/css/main.css'
  ],
})