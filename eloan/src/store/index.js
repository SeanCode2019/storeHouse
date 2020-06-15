import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      subPage:{ text: "申請資訊", value: "FeedOperation" },
      combine:[]
  }, 
  getters:{
    getField,
  },
  mutations: {
    updateField,
  },
  actions: {
  },
  modules: {}
})