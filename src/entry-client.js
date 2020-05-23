import { createApp } from './app.js'

if (!window.__APP__) {
  window.__APP__ = {
    init: partialId => {
      // console.log('INIT - ', partialId)
      const { app, router, store } = createApp()
      router.push(window.__VROUTE__[partialId])
      // if (window.__INITIAL_STATE__[partialId]) {
      //   // We initialize the store state with the data injected from the server
      //   store.replaceState(window.__INITIAL_STATE__[partialId])
      //   router.push(window.__INITIAL_STATE__[partialId].route.fullPath)
      // } else {
      //   console.warn(`CANNOT find the intial state for partial id ${partialId}`)
      // }
      app.$mount(`#${partialId}`)
    }
  }
}

if (module.hot) {
  const api = require('vue-hot-reload-api');
  const Vue = require('vue');

  api.install(Vue);
  if (!api.compatible) {
    throw new Error(
      'vue-hot-reload-api is not compatible with the version of Vue you are using.',
    );
  }

  module.hot.accept();
}

