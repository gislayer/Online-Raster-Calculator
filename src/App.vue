<template>
  <LeftSide/>
  <Bands/>
  <Map/>
</template>

<script>
import LeftSide from './components/LeftSide.vue'
import Bands from './components/Bands.vue'
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    LeftSide,
    Bands,
    Map,
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
