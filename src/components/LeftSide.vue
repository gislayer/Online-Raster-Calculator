<template>
  <div class="ui sidebar inverted vertical menu visible">
    <div class="item p0">
      <img src="@/assets/gislayer-logo-3.png">
    </div>
    <div class="item" style="color: #8bc34a;">{{title}}</div>
    <div class="item" style="text-align:left;">
      <div class="header">Add Raster Image</div>
      <div class="menu">
        <a class="item" href="#">Load From Computer</a>
        <a class="item" href="#">Load From URL</a>
      </div>
    </div>
    <div class="item" style="text-align:left;">
      <div class="header">Raster Analyzes</div>
      <div class="menu">
        <a class="item" href="#">NDVI Analysis</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftSide',
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
.p0{
  padding:0 !important;
}
.pt0{
  padding-top:0  !important;
}
</style>