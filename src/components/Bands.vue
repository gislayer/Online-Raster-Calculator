<template>
  <div class="ui inverted segment bands">
    <div v-show="bandType.selected!==''" class="horBands">Band List</div>
    <div v-show="bandType.selected!==''" @click="openBand(item)" :key="i" v-for="(item,i) in bands" class="hor" :style="{backgroundColor:item.color,color:item.fontColor}" :data-tooltip="item.title" data-inverted="" data-position="bottom center">
      <div class="mt10 fontBold noSelect">{{item.name}}</div>
    </div>
    <div v-show="bandType.selected!==''" class="field inv">
      <select @change="changePlotty" style="background-color:#646464; color:#fff;" v-model="plotty.selected" class="ui inverted fluid dropdown">
        <option :key="j" v-for="(list,j) in plotty.data" :value="list">{{list.toUpperCase()}} Color Scale</option>
      </select>
      <select @change="setBands" style="background-color:#646464; color:#fff;" v-model="bandType.selected" class="ui inverted fluid dropdown">
        <option :key="j" v-for="(list,j) in bandType.data" :value="list.id">{{list.name}}</option>
      </select>
    </div>
    <div></div>
    <div class="ui grid legend" >
      <div class="left one wide column p0" style="padding:0; padding-left:10px; text-align: center; font-size: 10px;" id="raster_min"></div>
      <div id="legend" class="fourteen wide column p0" style="padding:0;"><canvas id="legendCanvas"></canvas></div>
      <div class="right one wide column p0" style="padding:0; padding-right:10px; text-align: center; font-size: 10px;" id="raster_max"></div>
    </div>
  </div>
</template>

<script>
import GL from '../lib/GL.js'

export default {
  name: 'Bands',
  mounted() {
    this.setBands();
  },
  data(){
    return {
      clickedBand:'',
      plotty:{
        selected:'rainbow',
        data:['ndvicolor','viridis','inferno','turbo','rainbow','jet','hsv','hot','cool','spring','summer','autumn','winter','bone','copper','greys','ylgnbu','greens','ylorrd','bluered','rdbu','picnic','portland','blackbody','earth','electric','magma','plasma']
      },
      bandType:{
          selected:'',
          data:[
              {
                  id:'sentinel2',name:'Sat. Imgage : Sentinel 2 MSI'
              },
              {
                  id:'landsat5',name:'Sat. Imgage : Landsat 5 TM'
              },
              {
                  id:'landsat8',name:'Sat. Imgage : Landsat 8 OLI'
              },
              {
                  id:'ibgr',name:'Sat. Imgage : IBGR'
              },
              {
                  id:'rgbi',name:'Sat. Imgage : RGBI'
              },
              {
                  id:'custom',name:'Sat. Imgage : Custom'
              }
          ]
      },
      bands:[]
    }
  },
  methods: {
    setBands(){
      this.bands=[];
      if(this.bandType.selected!==''){
        //this.$root.$.components.LeftSide.methods.changeList(this.bandType.selected)
        this.$root.$refs.leftside.changeList(this.bandType.selected)
        var mybands = GL.satellites[this.bandType.selected];
        for(var i in mybands){
          this.bands.push({
            color:mybands[i].color,
            fontColor:mybands[i].fontColor,
            title:mybands[i].name,
            name:mybands[i]['band']
          });
        }
      }
    },
    getBands(){
      return this.bands;
    },
    openBand(band){
      var file = this.$root.$refs.leftside.getActiveFile();
      if(file){
        this.clickedBand = band.name;
        GL.changeBandLayer(file,band.name,this.plotty.selected);
      }
      
    },
    changePlotty(){
      console.log("changePlotty");
      if(GL.lastAnalysis.analysType=='band'){
        if(this.clickedBand==''){
                this.clickedBand="B01";
        }
        this.openBand({name:this.clickedBand});
      }
      if(GL.lastAnalysis.analysType=='calc'){
        var item = GL.RSanalysis[GL.lastAnalysis.analysisId];
        this.$root.$refs.leftside.doAnalys(item);
      }
    }
  },
}
</script>

<style scoped>
.bands{
  width: calc(100% - 210px) !important;
  left: 210px !important;
  border-radius: 0 !important;
  background-color: #2F3133 !important;
  text-align:left;
  padding: 10px;
  position: fixed !important;
  top: 0 !important;
  margin: 0 !important;
  z-index:1 !important;
  min-height: 74px;
}
.horBands{
  display:inline-block;
  width:75px;
  text-align:center;
  border-radius:100%;
  margin-left:10px;
  margin-right:10px;
  margin-top:12px;
  opacity:1;
  cursor:pointer;
}
.hor{
  display:inline-block;
  width:46px;
  height:46px;
  text-align:center;
  border-radius:100%;
  border:2px solid #fff;
  margin-left:10px;
  margin-right:10px;
  opacity:0.7;
  cursor:pointer;
}
.hor:hover{
  opacity:1;
}
.band{
  width:46px !important;
  height:46px !important;
}
.mt10{
  margin-top:10px;
}
.fontBold{
  font-weight: bold;
}
.noSelect{
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
}
.inv{
    width: 220px;
    position: fixed;
    top: -2px;
    right: 0;
    background-color: #2f3133;
}
.legend{
    top: 88px;
    height: 20px;
    background-color: #ccc;
    position: fixed;
    width: calc(100% - 210px);
    left: 224px;
    background-color: #000;
}
.p0{
  padding: 0 !important;
}
</style>

