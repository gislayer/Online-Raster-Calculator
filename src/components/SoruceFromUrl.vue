<template>
    <div v-if="active" :class="active==true?'ui dimmer modals page transition visible active':'ui dimmer modals page transition'" style="display: flex !important;">
        <div :class="active==true?'ui mini test modal transition visible active':'ui mini test modal transition'">
                <div class="header">What is Source of Satellite Image File?</div>
                <div class="content">
                    <div class="ui form">
                      <div class="field">
                        <label>Select Data Source : </label>
                        <select @change="setBands" v-model="bandType.selected" class="ui inverted fluid dropdown mt5">
                            <option :key="j" v-for="(list,j) in bandType.data" :value="list.id">{{list.name}}</option>
                        </select>
                      </div>
                      <div class="field mt20">
                          <label>Source URL : </label>
                          <input type="text" v-model="url" placeholder="Please Enter URL of Tif, GeoTiff File ">
                      </div>
                    </div>
                    
                </div>
                <div class="actions">
                    <div @click="close" class="ui mini cancel button">Cancel</div>
                    <div @click="typeSelected" class="ui mini green approve button">Load File</div>
                </div>
            </div>
    </div>
    
</template>

<script>

export default {
  name: 'SoruceFromUrl',
  data(){
    return {
        active:false,
        callback:null,
        url:'',
        bandType:{
          selected:'landsat8',
          data:[
              {
                  id:'sentinel2',name:'Sentinel 2 MSI'
              },
              {
                  id:'landsat5',name:'Landsat 5 TM'
              },
              {
                  id:'landsat8',name:'Landsat 8 OLI'
              },
              {
                  id:'ibgr',name:'IBGR'
              },
              {
                  id:'rgbi',name:'RGBI'
              },
              {
                  id:'custom',name:'Custom'
              }
          ]
      },
    }
  },
  mounted(){
      
  },
  methods: {
    setBands(){},
    selectType(callback){
        this.active=true;
        this.callback=callback;
    },
    typeSelected(){
        if(this.callback!==null){
          if(this.bandType.selected!=='' && this.url!==''){
              this.active=false;
                this.callback(this.bandType.selected,this.url);
            }else{
                alert('Please select satellite image type and enter url');
            }
        }
    },
    close(){
        this.active=false;
        this.callback=null;
    }
  },
}
</script>

<style scoped>
.inv2{
    width: 220px;
    background-color: #2f3133;
}
.mt5{
    margin-top: 5px;
}
.mt20{
    margin-top: 20px;
}
</style>
