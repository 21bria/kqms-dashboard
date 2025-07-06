// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/leaflet'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  app: {
    head: {
      title: 'NickelMine Dashboard',
      meta: [
        { name: 'description', content: 'Professional mining nickel dashboard with data visualization' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  },
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    '@charts': '/components/charts'
  },
  plugins: [
    '~/plugins/apexcharts.client'],
  build: {
    transpile: [
      '@vue-leaflet/vue-leaflet',
      'vue-echarts', 'echarts'
    ],
  },
  // components: [
  //   {
  //     path: 'node_modules/vue-echarts',
  //     prefix: 'v'
  //   }
  // ],

})