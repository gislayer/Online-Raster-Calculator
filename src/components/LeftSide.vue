<template>
  <div class="ui sidebar inverted vertical menu visible" @change-satellite="changeList">
    <div class="item p0">
      <img src="@/assets/gislayer-logo-3.png">
    </div>
    <div class="item" style="color: #8bc34a;">{{title}}</div>

    <div class="item" style="text-align:left;">
      <div class="header" style="color:#00bcd4;">Add Raster Image</div>
      <div class="menu">
        <a @click="loadFromComputer" class="item" href="#">Load From Computer</a>
        <a @click="loadFromURL" class="item" href="#">Load From URL</a>
      </div>
    </div>

    <div v-if="files.length>0" class="item" style="text-align:left;">
      <div class="header" style="color:#00bcd4;">Loaded Files</div>
      <div class="menu">
        <table style="width:100%;">
          <tr :key="i" v-for="(file,i) in files">
            <td style="width: 25px;padding: 5px;"><input @click="openRasterFile(file)" :checked="activeLayer==file.id" type="radio" name="layers"></td>
            <td><a :class="activeLayer==file.id?'gc':'ggc'" @click="openRasterFile(file)" href="#">{{file.name}}</a></td>
            <td @click="downloadLayer(file)" title="Download This Image" class="bintrsh"><i class="cloud download icon"></i></td>
            <td @click="removeLayer(file)" title="Remove This Layer" class="bintrsh2"><i class="trash alternate icon"></i></td>
          </tr>
        </table>
        
      </div>
    </div>

    

    <div v-show="files.length>0 && isThereActiveFile" class="item" style="text-align:left;">
      <div class="header" style="color:#00bcd4;">Raster Analyzes</div>
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
                  <div>
                    <div class="ui p3">
                      <input @input="changeOpacity(item)" style="width:100%;" type="range" min="0" max="1" step="0.01" v-model="item.opacity">
                    </div>
                  </div>
                  <div class="mini ui buttons wp">
                    <button @click="clearAnalysis" class="ui red button">Clear</button>
                    <div class="or"></div>
                    <button @click="doAnalys(item)" class="ui positive button">Run</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item" style="text-align:left;">
      <div class="header" style="color:#00bcd4;">Project Informations</div>
      <div class="menu">
        <a title="Fork me on GitHub" class="item" href="https://github.com/gislayer/Online-Raster-Calculator" target="_blank">GitHub Repository</a>
        <a class="item" href="https://www.alikilic.org/" target="_blank">Developer</a>
        <a class="item" href="https://www.gislayer.com/" target="_blank">Sponsore</a>
        <a class="item" href="mailto:ali.kilic@gislayer.com" target="_blank">Feedback</a>
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
            this.openRasterFile(file);
          });
       });
    },
    loadFromURL(){
       this.$root.$refs.sourcefromurl.selectType((selectedType,url)=>{
         console.log(selectedType);
         console.log(url);
         this.$root.$refs.bands.bandType.selected = selectedType;
         this.$root.$refs.bands.setBands();
         GL.loadGeoTIFFFromURL(selectedType,url,(file)=>{
            this.files.push(file);
            this.openRasterFile(file);
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
    },
    doAnalys(item){
      console.log(item);
      var plottyName = this.$root.$refs.bands.plotty.selected;
      switch(item.type){
        case 1:{
          GL.doAnalysis1(item,this.getActiveFile(),plottyName);
          GL.changeOpacity(this.getActiveFile(),item.opacity);
          break;
        }
      }
    },
    clearAnalysis(){
      GL.showRGBRaster(this.getActiveFile());
    },
    changeOpacity(item){
      GL.changeOpacity(this.getActiveFile(),item.opacity);
    },
    removeLayer(file){
      
      this.$root.$refs.comfirm.ask('Are you sure you want to remove this layer('+file.name+')?',(status)=>{
        if(status){
          document.getElementById('raster_min').innerHTML='';
          document.getElementById('raster_max').innerHTML='';
          document.getElementById('legend').innerHTML='<canvas id="legendCanvas"></canvas>';
          GL.lastAnalysis = {
      layerid:'',
      analysisId:'',
      analysType:''
    };
          var arr = [];
          this.files.forEach((f)=>{
            if(f.id!=file.id){
              arr.push(f);
            }
          });
          this.files = arr;
          if(this.activeLayer==file.id){
            this.activeLayer='';
            this.isThereActiveFile=false;
          }
          GL.removeLayer(file);
        }
      });
    },
    downloadLayer(){
      var file = this.getActiveFile();
      GL.downloadRaster(file);
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
  width: 20px;
  padding: 0px;
  cursor: pointer;
  color: #626262
}
.bintrsh:hover{
  color: #8bc34a;
}
.bintrsh2{
    width: 20px;
    padding: 0px;
    cursor: pointer;
    color: rgb(98, 98, 98);
}
.bintrsh2:hover{
  color: #f44336;
}
.p3{
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}
</style>