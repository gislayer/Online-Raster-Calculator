import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      satelliteType: 0
    }
  },
  mutations: {
    changeSatellite (state,payload) {
      console.log("changeSatellite Çalıştı : "+payload);
      state.satelliteType=payload;
    }
  }
})

export default store