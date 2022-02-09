<template>
  <LeftSide ref="leftside"/>
  <Bands ref="bands"/>
  <Map ref="map"/>
  <BandSourceType ref="bandsourcetype"/>
</template>

<script>
import LeftSide from './components/LeftSide.vue'
import Bands from './components/Bands.vue'
import Map from './components/Map.vue'
import BandSourceType from './components/BandSourceType.vue'

export default {
  name: 'App',
  components: {
    LeftSide,
    Bands,
    Map,
    BandSourceType,
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
  margin-top: 60px;
}
</style>
