<template>
  <div class="ui sidebar inverted vertical menu visible" @change-satellite="changeList">
    <div class="item p0">
      <img src="@/assets/gislayer-logo-3.png">
    </div>
    <div class="item" style="color: #8bc34a;">{{title}}</div>

    <div class="item" style="text-align:left;">
      <div class="header">Add Raster Image</div>
      <div class="menu">
        <a @click="loadFromComputer" class="item" href="#">Load From Computer</a>
        <a class="item" href="#">Load From URL</a>
      </div>
    </div>

    <div v-if="files.length>0" class="item" style="text-align:left;">
      <div class="header">Loaded Files</div>
      <div class="menu">
        <table style="width:100%;">
          <tr :key="i" v-for="(file,i) in files">
            <td style="width: 25px;padding: 5px;"><input @click="openRasterFile(file)" :checked="activeLayer==file.id" type="radio" name="layers"></td>
            <td><a :class="activeLayer==file.id?'gc':'ggc'" @click="openRasterFile(file)" href="#">{{file.name}}</a></td>
            <td title="Remove This Layer" class="bintrsh"><i class="trash alternate icon"></i></td>
          </tr>
        </table>
        
      </div>
    </div>

    <div v-show="files.length>0 && isThereActiveFile" class="item" style="text-align:left;">
      <div class="header">Raster Analyzes</div>
      <div class="menu">
        <div class="ui inverted accordion">
          <div :key="i" v-for="(item,i) in analysisList" :class="bandType==item.id?'cp bg2':'cp'">
            <div :class="bandType==item.id?'title active gc':'title'" @click="openMenu(item)">
              <i class="dropdown icon"></i>
              {{item.name}}
            </div>
            <div v-if="item.type==1" :class="bandType==item.id?'content active':'content'">
              
              <div class="card">
                <div class="content">
                  <div class="description plr10 cntr">
                    {{item.method.join(' ')}}
                  </div>
                </div>
                <div class="extra content">
                  <div class="mini ui buttons wp">
                    <button class="ui red button">Clear</button>
                    <div class="or"></div>
                    <button class="ui positive button">Run</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GL from '../lib/GL.js'
export default {
  name: 'LeftSide',
  data(){
    return {
      title:'Online Raster Calculator',
      analysisList:[],
      files:[],
      isThereActiveFile:false,
      bandType:'',
      activeLayer:'',
    }
  },
  mounted(){
    
  },
  methods: {
    changeList(type){
      this.bandType=type;
      var analysisList = [];
      for(var i in GL.RSanalysis){
        var analysis = GL.RSanalysis[i];
        if(analysis.accepted.indexOf(type)>-1){
          analysisList.push(analysis);
        }
      }
      this.analysisList=analysisList;
      console.log(analysisList);
    },
    openMenu(item){
      if(this.bandType==item.id){
        this.bandType='';
      }else{
        this.bandType=item.id;
      }
      
    },
    loadFromComputer(){
       this.$root.$refs.bandsourcetype.selectType((selectedType)=>{
         console.log(selectedType);
         this.$root.$refs.bands.bandType.selected = selectedType;
         this.$root.$refs.bands.setBands();
          GL.loadGeoTIFFFromComputer(selectedType,(file)=>{
            this.files.push(file);
          });
       });
    },
    openRasterFile(file){
      this.$root.$refs.bands.bandType.selected = file.bandType;
      this.$root.$refs.bands.setBands();
      this.activeLayer=file.id;
      GL.addRasterLayer(file);
      this.isThereActiveFile=true;
    },
    getActiveFile(){
      return this.files.find((file)=>{
        return file.id==this.activeLayer;
      });
    }
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
.cp{
   cursor:pointer  !important;
   margin-bottom:10px !important;
}
.gc{
  color:#8bc34a !important;
}
.ggc{
  color:#616161 !important;
}
.wp{
  width: 100%;
  padding: 10px;
}
.plr10{
  padding-left: 10px;
  padding-right: 10px;
  font-size:10px;
}
.cntr{
  text-align:center;
}
.bg2{
  background-color: #2f3133;
}
.bintrsh{
  width: 25px;
  padding: 5px;
  cursor: pointer;
  color: #626262
}
.bintrsh:hover{
  color: #8bc34a;
}
</style>