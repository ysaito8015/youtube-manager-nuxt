export default {
  srcDir: 'app',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'youtube-manager-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-youtube',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/bulma',
    '@nuxtjs/axios'
  ],

  // Axios module configuration
  // See https://axios.nuxtjs.org/options
  axios: {
    baseURL: 'http://localhost:8080/'
  },

  // Proxy configuration
  proxy: {
    '/api': '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
