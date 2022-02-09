<template>
    <div v-if="active" :class="active==true?'ui dimmer modals page transition visible active':'ui dimmer modals page transition'" style="display: flex !important;">
        <div :class="active==true?'ui mini test modal transition visible active':'ui mini test modal transition'">
                <div class="header">What is Source of RS Image File?</div>
                <div class="content">
                    <div class="field">
                        <select @change="setBands" v-model="bandType.selected" class="ui inverted fluid dropdown">
                            <option :key="j" v-for="(list,j) in bandType.data" :value="list.id">{{list.name}}</option>
                        </select>
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
  name: 'BandSourceType',
  data(){
    return {
        active:false,
        callback:null,
        bandType:{
          selected:'sentinel2',
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
        this.active=false;
        if(this.callback!==null){
            this.callback(this.bandType.selected);
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
</style>
