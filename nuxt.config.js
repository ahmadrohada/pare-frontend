
export default {
  //mode: 'universal',
  /*
  ** Headers of the page
  */
  ssr:false,
  head: {
    title: 'PARE 2021',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'}

    ],
    bodyAttrs: {
      class: 'white-content' // Add `white-content` class here to enable "white" mode.
    }
  },
  router: {
    linkExactActiveClass: 'active'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'assets/css/demo.css',
    'assets/css/nucleo-icons.css',
    'assets/sass/black-dashboard.scss',
    'assets/css/tui-calendar.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    `~/plugins/dashboard-plugin.js`,
    
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: ["@nuxtjs/pwa", "nuxt-i18n", "@nuxtjs/axios", "@nuxtjs/auth","@nuxtjs/dotenv"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { baseURL: process.env.apiUrl },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { 
            url: 'login', method: 'post', propertyName: 'token' 
          },
          user: { 
            url: 'me', method: 'get', propertyName: 'data' 
          }, 
          logout: false
          
        }
      },
    },
    redirect: {
      //login: '/login',
      //logout: '/login', //after logout, user will be redirected here.
      //home: '/home'
    },
  },
  
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js'
      },
      {
        code: 'ar',
        file: 'ar.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    babel: {
      plugins: [
        [
          'component',
          {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
          }
        ]
      ]
    }
  },
  pwa: {
    manifest: {
      name: 'PARE V3',
      theme_color: '#1c9963',
    }
  }
  
}
