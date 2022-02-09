<template>
  <div class="ui inverted segment bands">
    <div class="horBands">Band List</div>
    <div :key="i" v-for="(item,i) in bands" class="hor" :style="{backgroundColor:item.color,color:item.fontColor}" :data-tooltip="item.title" data-inverted="" data-position="bottom center">
      <div class="mt10 fontBold noSelect">{{item.name}}</div>
    </div>
    <div class="field inv">
      <select style="background-color:#646464; color:#fff;" v-model="bandType.selected" class="ui inverted fluid dropdown">
        <option :key="j" v-for="(list,j) in bandType.data" :value="list.id">{{list.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bands',
  mounted() {
    this.setBands();
  },
  data(){
    return {
      bandType:{
          selected:'sentinel2',
          data:[
              {
                  id:'sentinel2',name:'Source Type : Sentinel-2'
              },
              {
                  id:'landsat8',name:'Source Type : Landsat 8'
              },
              {
                  id:'custom',name:'Source Type : Custom'
              }
          ],
          sentinel2:[
              {
                  name:'B01',
                  title:'Coastal Aerosol',
                  color:'#673AB7',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B02',
                  title:'Blue',
                  color:'#2196F3',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B03',
                  title:'Green',
                  color:'#4CAF50',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B04',
                  title:'Red',
                  color:'#F44336',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B05',
                  title:'Vegetation Red Edge - 704.1nm',
                  color:'#E91E63',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B06',
                  title:'Vegetation Red Edge - 740.5nm',
                  color:'#9C27B0',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B07',
                  title:'Vegetation Red Edge - 782.8nm',
                  color:'#3F51B5',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B08',
                  title:'NIR',
                  color:'#B20000',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B8A',
                  title:'Narrow NIR',
                  color:'#008C69',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B09',
                  title:'Water Vapour',
                  color:'#888888',
                  fontColor:'#EEEEEE'
              },
              {
                  name:'B10',
                  title:'SWIR – Cirrus',
                  color:'#8BC34A',
                  fontColor:'#2E3133'
              },
              {
                  name:'B11',
                  title:'SWIR - 1613.7nm',
                  color:'#FFEB3B',
                  fontColor:'#2E3133'
              },
              {
                  name:'B12',
                  title:'SWIR - 2202.4nm',
                  color:'#FFC107',
                  fontColor:'#2E3133'
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
        this.bandType[this.bandType.selected].map(item=>{
          this.bands.push(item);
        });
      }
    },
    getBands(){
      return this.bands;
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
}
.horBands{
  display:inline-block;
  width:75px;
  text-align:center;
  border-radius:100%;
  margin-left:10px;
  margin-right:10px;
  opacity:1;
  cursor:pointer;
}
.hor{
  display:inline-block;
  width:46px;
  height:46px;
  text-align:center;
  border-radius:100%;
  border:2px solid #000000;
  margin-left:10px;
  margin-right:10px;
  opacity:0.6;
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
    width: 200px;
    position: fixed;
    top: 18px;
    right: 0;
    margin-right: 20px;
    background-color: #2f3133;
}
</style>