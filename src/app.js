import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router.js'
import { createStore } from './store.js'
import { sync } from 'vuex-router-sync'

export function createApp (context) {
  const router = createRouter()

  const store = createStore(context)

  // sync so that route state is available as part of the store
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })

  return { app, router, store }
}
