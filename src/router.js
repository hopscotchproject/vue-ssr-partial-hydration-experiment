import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'abstract', // abstract mode so it doesn't change browser route
    routes: [
      { path: '/foo', component: () => import('./components/Foo.vue') },
      { path: '/baz', component: () => import('./components/Baz.vue') },
      { path: '/bar', component: () => import('./components/Bar.vue') }
    ]
  })
}
