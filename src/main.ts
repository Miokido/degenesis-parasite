import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
//import router from '@/router'
import messages from './config/messages'
import { createPinia, setMapStoreSuffix } from 'pinia'
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackWarn: false,
  messages
})

const app = createApp(App)

setMapStoreSuffix('')
const pinia = createPinia()
app.use(pinia)
declare module 'pinia' {
  export interface MapStoresCustomization {
    // set it to the same value as above
    suffix: ''
  }
}

app.use(i18n)

import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
})
app.use(vuetify)

app.mount('#app')
