import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      satelliteType: 0
    }
  },
  mutations: {
    changeSatellite (state,payload) {
      state.satelliteType=payload;
    }
  }
})

export default store;