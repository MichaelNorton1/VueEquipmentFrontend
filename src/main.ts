import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// Import BootstrapVue 3
import BootstrapVue3 from 'bootstrap-vue-3'
import './assets/custom.scss';
const app = createApp(App)

app.use(createPinia())
app.use(BootstrapVue3)
app.mount('#app')
