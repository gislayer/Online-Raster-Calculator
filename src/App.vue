<template>
  <LeftSide ref="leftside"/>
  <Bands ref="bands"/>
  <Map ref="map"/>
  <BandSourceType ref="bandsourcetype"/>
  <SoruceFromUrl ref="sourcefromurl"/>
  <Comfirm ref="comfirm"/>
</template>

<script>
import LeftSide from './components/LeftSide.vue'
import Bands from './components/Bands.vue'
import Map from './components/Map.vue'
import BandSourceType from './components/BandSourceType.vue'
import SoruceFromUrl from './components/SoruceFromUrl.vue'
import Comfirm from './components/Comfirm.vue'

export default {
  name: 'App',
  components: {
    LeftSide,
    Bands,
    Map,
    BandSourceType,
    SoruceFromUrl,
    Comfirm,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
