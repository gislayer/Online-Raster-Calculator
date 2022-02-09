<template>
  <div class="ui inverted segment bands">
    <div v-show="bandType.selected!==''" class="horBands">Band List</div>
    <div v-show="bandType.selected!==''" @click="openBand(item)" :key="i" v-for="(item,i) in bands" class="hor" :style="{backgroundColor:item.color,color:item.fontColor}" :data-tooltip="item.title" data-inverted="" data-position="bottom center">
      <div class="mt10 fontBold noSelect">{{item.name}}</div>
    </div>
    <div v-show="bandType.selected!==''" class="field inv">
      <select @change="setBands" style="background-color:#646464; color:#fff;" v-model="bandType.selected" class="ui inverted fluid dropdown">
        <option :key="j" v-for="(list,j) in bandType.data" :value="list.id">{{list.name}}</option>
      </select>
    </div>
    <div></div>
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
      bandType:{
          selected:'',
          data:[
              {
                  id:'sentinel2',name:'Source Type : Sentinel 2 MSI'
              },
              {
                  id:'landsat5',name:'Source Type : Landsat 5 TM'
              },
              {
                  id:'landsat8',name:'Source Type : Landsat 8 OLI'
              },
              {
                  id:'ibgr',name:'Source Type : IBGR'
              },
              {
                  id:'rgbi',name:'Source Type : RGBI'
              },
              {
                  id:'custom',name:'Source Type : Custom'
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
    openBand:function(band){
      var file = this.$root.$refs.leftside.getActiveFile();
      GL.changeBandLayer(file,band.name);
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
    top: 18px;
    right: 0;
    margin-right: 20px;
    background-color: #2f3133;
}
</style>