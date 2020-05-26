import Vue from 'vue'
import Vuex from 'vuex'
import get from 'lodash.get'

Vue.use(Vuex)

export function createStore (context) {
  return new Vuex.Store({
    state: get(context, 'body', {})
  })
}