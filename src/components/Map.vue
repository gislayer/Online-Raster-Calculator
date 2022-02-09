<template>
  <div id="map"></div>
  <div class="basemaps">
    <div @click="openBasemap('dark')" :class="basemaptype=='dark'?'activeBasemap':'passiveBasemap'" data-inverted="" data-position="left center" data-tooltip="Dark Map"><img style="margin-bottom:5px;" height="40" class="ui circular image" src="@/assets/dark.png"></div>
    <div @click="openBasemap('satellite')" :class="basemaptype=='satellite'?'activeBasemap':'passiveBasemap'" data-inverted="" data-position="left center" data-tooltip="Satellite Map"><img style="margin-bottom:5px;" height="40" class="ui circular image" src="@/assets/sat.png"></div>
    <div @click="openBasemap('street')" :class="basemaptype=='street'?'activeBasemap':'passiveBasemap'" data-inverted="" data-position="left center" data-tooltip="Street Map"><img style="margin-bottom:5px;" height="40" class="ui circular image" src="@/assets/street.png"></div>
  </div>
</template>

<script>

import GL from '../lib/GL.js'


export default {
  name: 'Map',
  data(){
    return {
      title:'Online Raster Calculator',
      basemaptype:'satellite',
      map:false
    }
  },
  mounted(){
     console.log("Harita Yükleniyor");
      this.initMap();
  },
  methods: {
    initMap(){
        this.map = GL.initMap();
    },
    openBasemap:function(type){
        GL.mesaj="openBasemap"
        this.basemaptype=type;
        GL.changeBasemap(type);
    }
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
    .basemaps{
        position:fixed;
        right:10px;
        bottom:10px;
    }
    .activeBasemap{
        cursor:pointer;
        opacity:1;
    }
    .passiveBasemap:hover{
        opacity:1;
    }
    .passiveBasemap{
        cursor:pointer;
        opacity:0.5;
    }
</style>