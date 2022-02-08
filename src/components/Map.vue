<template>
  <div id="map">
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

export default {
  name: 'Map',
  data(){
    return {
      title:'Online Raster Calculator'
    }
  },
  methods: {
    
  },
}
</script>

<style scoped>
    #map{
        position: fixed;
        top: 74px;
        left: 210px;
        width: calc(100% - 210px);
        height: calc(100% - 74px);
        background: #3d3e3f;
    }
</style>