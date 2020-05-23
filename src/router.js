import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'abstract', // abstract mode so it doesn't change browser route
    routes: [
      { path: '/', component: () => import('./components/Home.vue') },
      { path: '/foo', component: () => import('./components/Foo.vue') },
      { path: '/bar', component: () => import('./components/Bar.vue') }
    ]
  })
}
