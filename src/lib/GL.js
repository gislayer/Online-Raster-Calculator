//import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import {fromArrayBuffer} from 'geotiff';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {FullScreen, defaults as defaultControls, Zoom, ScaleLine} from 'ol/control';
import {transformExtent} from 'ol/proj';

var GL = {
    rasters:{},
    map:false,
    basemap:false,
    controls:{
        zoom:false,
        fullscreen:false,
        scale:false
    },
    mesaj:'başlangıç'
    
};

GL.initMap = function(){
    this.controls.zoom = new Zoom();
    this.controls.fullscreen = new FullScreen();
    this.controls.scale = new ScaleLine();
    this.basemap = new TileLayer({
        source: new XYZ({
            url: 'https://mts{0-3}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
            })
        })
    this.map = new Map({
        target: 'map',
        layers: [this.basemap],
        view: new View({
            center: [0, 0],
            zoom: 1
        }),
        controls: defaultControls().extend([this.controls.fullscreen,this.controls.zoom,this.controls.scale]),
    });
    return this.map;
}

GL.changeBasemap = function(type){
    var url = "";
    switch(type){
        case 'dark':{
            url = 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
            break;
        }
        case 'satellite':{
            url = 'https://mts{0-3}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
            break;
        }
        case 'street':{
            url = 'https://mts{0-3}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
            break;
        }
    }
    var source = this.basemap.getSource();
    source.setUrl(url)
}

GL.satellites = {
    rgbi:{
        RED:{id:0,sname:'RED',name:'RED',band:'B01',color:'#F44336',fontColor:'#EEEEEE'},
        GREEN:{id:1,sname:'GREEN',name:'GREEN',band:'B02',color:'#4CAF50',fontColor:'#EEEEEE'},
        BLUE:{id:2,sname:'BLUE',name:'BLUE',band:'B03',color:'#2196F3',fontColor:'#EEEEEE'},
        NIR1:{id:3,sname:'NIR1',name:'NIR 0.76 - 0.90µm',band:'B04',color:'#B20000',fontColor:'#EEEEEE'},
    },
    ibgr:{
        NIR1:{id:0,sname:'NIR1',name:'NIR 0.76 - 0.90µm',band:'B01',color:'#B20000',fontColor:'#EEEEEE'},
        BLUE:{id:1,sname:'BLUE',name:'BLUE',band:'B02',color:'#2196F3',fontColor:'#EEEEEE'},
        GREEN:{id:2,sname:'GREEN',name:'GREEN',band:'B03',color:'#4CAF50',fontColor:'#EEEEEE'},
        RED:{id:3,sname:'RED',name:'RED',band:'B04',color:'#F44336',fontColor:'#EEEEEE'},
    },
    landsat5:{
        BLUE:{id:0,sname:'BLUE',name:'BLUE',band:'B01',color:'#2196F3',fontColor:'#EEEEEE'},
        GREEN:{id:1,sname:'GREEN',name:'GREEN',band:'B02',color:'#4CAF50',fontColor:'#EEEEEE'},
        RED:{id:2,sname:'RED',name:'RED',band:'B03',color:'#F44336',fontColor:'#EEEEEE'},
        NIR1:{id:3,sname:'NIR1',name:'NIR 0.76 - 0.90µm',band:'B04',color:'#B20000',fontColor:'#EEEEEE'},
        NIR2:{id:4,sname:'NIR2',name:'NIR 1.55 - 1.75µm',band:'B05',color:'#9C27B0',fontColor:'#EEEEEE'},
        SWIR1:{id:5,sname:'SWIR1',name:'SWIR-1 Thermal',band:'B06',color:'#FFEB3B',fontColor:'#2E3133'},
        SWIR2:{id:6,sname:'SWIR2',name:'SWIR-2 Mid-Infrared',band:'B07',color:'#FFC107',fontColor:'#2E3133'},
    },
    landsat8:{
        COST:{id:0,sname:'COST',name:'Coastal Aerosol',band:'B01',color:'#673AB7',fontColor:'#EEEEEE'},
        BLUE:{id:1,sname:'BLUE',name:'BLUE',band:'B02',color:'#2196F3',fontColor:'#EEEEEE'},
        GREEN:{id:2,sname:'GREEN',name:'GREEN',band:'B03',color:'#4CAF50',fontColor:'#EEEEEE'},
        RED:{id:3,sname:'RED',name:'RED',band:'B04',color:'#F44336',fontColor:'#EEEEEE'},
        NIR1:{id:4,sname:'NIR1',name:'NIR',band:'B05',color:'#B20000',fontColor:'#EEEEEE'},
        SWIR1:{id:5,sname:'SWIR1',name:'SWIR-1',band:'B06',color:'#FFEB3B',fontColor:'#2E3133'},
        SWIR2:{id:6,sname:'SWIR2',name:'SWIR-2',band:'B07',color:'#FFC107',fontColor:'#2E3133'},
        PANC:{id:7,sname:'PANC',name:'Panchromatic',band:'B08',color:'#E91E63',fontColor:'#EEEEEE'},
        SWIRC:{id:8,sname:'SWIRC',name:'SWIR Cirrius',band:'B09',color:'#8BC34A',fontColor:'#2E3133'},
        TIRS1:{id:9,sname:'TIRS1',name:'Therman Infrared 1',band:'B10',color:'#9C27B0',fontColor:'#EEEEEE'},
        TIRS2:{id:10,sname:'TIRS2',name:'Therman Infrared 2',band:'B11',color:'#3F51B5',fontColor:'#EEEEEE'},
    },
    sentinel2:{
        COST:{id:0,sname:'COST',name:'Coastal Aerosol',band:'B01',color:'#673AB7',fontColor:'#EEEEEE'},
        BLUE:{id:1,sname:'BLUE',name:'BLUE',band:'B02',color:'#2196F3',fontColor:'#EEEEEE'},
        GREEN:{id:2,sname:'GREEN',name:'GREEN',band:'B03',color:'#4CAF50',fontColor:'#EEEEEE'},
        RED:{id:3,sname:'RED',name:'RED',band:'B04',color:'#F44336',fontColor:'#EEEEEE'},
        VRE1:{id:4,sname:'VRE1',name:'Vegetation Red Edge 0.705µm',band:'B05',color:'#E91E63',fontColor:'#EEEEEE'},
        VRE2:{id:5,sname:'VRE2',name:'Vegetation Red Edge 0.740µm',band:'B06',color:'#9C27B0',fontColor:'#EEEEEE'},
        VRE3:{id:6,sname:'VRE3',name:'Vegetation Red Edge 0.783µm',band:'B07',color:'#3F51B5',fontColor:'#EEEEEE'},
        NIR1:{id:7,sname:'NIR1',name:'NIR',band:'B08',color:'#B20000',fontColor:'#EEEEEE'},
        VRE4:{id:8,sname:'VRE4',name:'Vegetation Red Edge 0.865µm',band:'B8A',color:'#008C69',fontColor:'#EEEEEE'},
        WAT:{id:9,sname:'WAT',name:'Water Vapour',band:'B09',color:'#888888',fontColor:'#EEEEEE'},
        SWIRC:{id:10,sname:'SWIRC',name:'SWIR Cirrius',band:'B10',color:'#8BC34A',fontColor:'#2E3133'},
        SWIR1:{id:11,sname:'SWIR1',name:'SWIR-1',band:'B11',color:'#FFEB3B',fontColor:'#2E3133'},
        SWIR2:{id:12,sname:'SWIR2',name:'SWIR-2',band:'B12',color:'#FFC107',fontColor:'#2E3133'},
    },
    custom:{
        B01:{id:0,sname:'B01',name:'B01',band:'B01',color:'#673AB7',fontColor:'#EEEEEE'},
        B02:{id:1,sname:'B02',name:'B02',band:'B02',color:'#2196F3',fontColor:'#EEEEEE'},
        B03:{id:2,sname:'B03',name:'B03',band:'B03',color:'#4CAF50',fontColor:'#EEEEEE'},
        B04:{id:3,sname:'B04',name:'B04',band:'B04',color:'#F44336',fontColor:'#EEEEEE'},
        B05:{id:4,sname:'B05',name:'B05',band:'B05',color:'#E91E63',fontColor:'#EEEEEE'},
        B06:{id:5,sname:'B06',name:'B06',band:'B06',color:'#9C27B0',fontColor:'#EEEEEE'},
        B07:{id:6,sname:'B07',name:'B07',band:'B07',color:'#3F51B5',fontColor:'#EEEEEE'},
        B08:{id:7,sname:'B08',name:'B08',band:'B08',color:'#B20000',fontColor:'#EEEEEE'},
        B09:{id:9,sname:'B09',name:'B09',band:'B09',color:'#888888',fontColor:'#EEEEEE'},
        B10:{id:10,sname:'B10',name:'B10',band:'B10',color:'#8BC34A',fontColor:'#2E3133'},
        B11:{id:11,sname:'B11',name:'B11',band:'B11',color:'#FFEB3B',fontColor:'#2E3133'},
        B12:{id:12,sname:'B12',name:'B12',band:'B12',color:'#FFC107',fontColor:'#2E3133'},
    }
}

GL.RSanalysis = {
    ndvi:{
        id:'ndvi',
        type:1,
        name:'NDVI Analysis',
        method:['(','NIR','-','RED',')','/','(','NIR','+','RED',')'],
        vars:['NIR1','RED'],
        accepted:['rgbi','ibgr','landsat5','landsat8','sentinel2']
    },
    ndwi:{
        id:'ndwi',
        type:1,
        name:'NDWI Analysis',
        method:['(','GREEN','-','NIR',')','/','(','GREEN','+','NIR',')'],
        vars:['GREEN','NIR1'],
        accepted:['rgbi','ibgr','landsat5','landsat8','sentinel2']
    },
    nbr:{
        id:'nbr',
        type:1,
        name:'NBR Analysis',
        method:['(','NIR','-','SWIR-2',')','/','(','NIR','+','SWIR-2',')'],
        vars:['NIR1','SWIR2'],
        accepted:['landsat5','landsat8','sentinel2']
    },
    npcri:{
        id:'npcri',
        type:1,
        name:'NPCRI Analysis',
        method:['(','RED','-','BLUE',')','/','(','RED','+','BLUE',')'],
        vars:['RED','BLUE'],
        accepted:['rgbi','ibgr','landsat5','landsat8','sentinel2']
    },
    ndsi:{
        id:'ndsi',
        type:1,
        name:'NDSI Analysis',
        method:['(','GREEN','-','SWIR-1',')','/','(','GREEN','+','SWIR-1',')'],
        vars:['GREEN','SWIR1'],
        accepted:['landsat5','landsat8','sentinel2']
    },
    ndgi:{
        id:'ndgi',
        type:1,
        name:'NDGI Analysis',
        method:['(','NIR','-','GREEN',')','/','(','NIR','+','GREEN',')'],
        vars:['NIR1','GREEN'],
        accepted:['rgbi','ibgr','landsat5','landsat8','sentinel2']
    },
    ndmi:{
        id:'ndmi',
        type:1,
        name:'NDMI Analysis',
        method:['(','NIR','-','SWIR-1',')','/','(','NIR','+','SWIR-1',')'],
        vars:['NIR1','SWIR1'],
        accepted:['landsat5','landsat8','sentinel2']
    },
};


GL.loadGeoTIFFFromComputer = function(bandType,callback){
    var fileElement = document.createElement('input');
    fileElement.type = 'file';
    fileElement.accept = '.tiff,.tif,.geotiff';
    fileElement.click();
    fileElement.addEventListener('change',function(e){
      console.log("geldi");
      var file = e.target.files[0];
      var reader  = new FileReader();
      var ext = file.name.split('.').pop();
      var allowedExt = ['tiff','tif','geotiff'];
      if(allowedExt.indexOf(ext) == -1){
          alert('File format not supported. Supported formats: tif, tiff, geotiff');
          return false;
      }else{
        reader.addEventListener("load", function () {
          GL.readGeoTIFF(reader.result,(result)=>{
            callback({
              id:'file-'+Date.now(),
              name:file.name,
              ext:ext,
              data:result,
              bandType:bandType,
              added:false
            });
          });
            
            //var img = new Image();
        });
        reader.readAsArrayBuffer(file);
      }      
    },false);
}

GL.EPSG = {
  default: 'EPSG:3857',
  current: 'EPSG:3857',
  file: 'EPSG:4326',
  result: {},
  search: function search(text) {
    var url = 'https://epsg.io/?format=json&q=' + text;
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (result) {
      if (result.number_result > 0) {
        var res = result.results[0];
        var code = res['code'];
        var proj4def = res['proj4'];
        var newProjCode = 'EPSG:' + code;
        proj4.defs(newProjCode, proj4def);
        register(proj4);
      } else {
        alert("EPSG code not found");
      }
    });
  },
};

GL.readGeoTIFF = function(data,callback){
  console.log("fromArrayBuffer");
  fromArrayBuffer(data).then(function(tiff) {
    tiff.getImage().then(function(image) {
      var bits = image.fileDirectory.BitsPerSample;
      var epsgcode = image.geoKeys.ProjectedCSTypeGeoKey;
      var width = image.getWidth();
      var height = image.getHeight();
      var bbox = image.getBoundingBox();
      GL.EPSG.search(epsgcode);
      image.readRasters().then(function(bands){
        var result = {
          bands:bands,
          width:width,
          height:height,
          bbox:bbox,
          epsg:epsgcode,
          bits:bits
        }
        callback(result);
      });
    });
    
  });
}

GL.createRasterImage=function(obj){
  var width=obj.width;
  var height=obj.height;
  var bands=obj.bands;
  var bit = obj.bit;
  var k = 1;
  switch(bit[0]){
    case 8:{
      k=1;
      break;
    }
    case 16:{
      k=128;
      break;
    }
  }
  let canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height; 
  canvas.style.width  = width+'px';
  canvas.style.height = height+'px';

  var ctx=canvas.getContext("2d");
              
  var imageData=ctx.createImageData(width,height);
  var j=0;
  for(var i=0;i<imageData.data.length;i+=4){
    imageData.data[i+0] = bands[0][j]/k;
    imageData.data[i+1] = bands[1][j]/k;
    imageData.data[i+2] = bands[2][j]/k;
    imageData.data[i+3] = 255;
    j++
  }

  ctx.putImageData(imageData,0,0);
  var base64img=canvas.toDataURL("image/png");

  return base64img;
}

GL.addRasterLayer = function(file){
  console.log("addRasterLayer");
  var layerControl = this.rasters[file.id];
  if(layerControl!==undefined){
    GL.map.getView().fit(transformExtent(file.data.bbox, 'EPSG:'+file.data.epsg, 'EPSG:3857'), GL.map.getSize());
    return false;
  }
  var bandType = file.bandType;
  var sat = GL.satellites[bandType];
  var red = sat.RED.id;
  var green = sat.GREEN.id;
  var blue = sat.BLUE.id;
  var obj = {
    width:file.data.width,
    height:file.data.height,
    bands:[file.data.bands[red],file.data.bands[green],file.data.bands[blue]],
    bit:file.data.bits
  };
  var imageData = GL.createRasterImage(obj);
  this.rasters[file.id] = new ImageLayer({
    id:file.id,
    name:file.name,
    source:new Static({
      url: imageData,
      imageExtent: file.data.bbox,
      projection: 'EPSG:'+file.data.epsg
    })
  });

  this.map.addLayer(this.rasters[file.id]);
  GL.map.getView().fit(transformExtent(file.data.bbox, 'EPSG:'+file.data.epsg, 'EPSG:3857'), GL.map.getSize());
}

GL.changeBandLayer = function(file,bandName){
  console.log("changeBandLayer");
  var layer = GL.rasters[file.id];
  if(layer===undefined){
    return false;
  }
  var sat = GL.satellites[file.bandType];
  var bandnum=0;
  for(var i in sat){
    if(sat[i].band==bandName){
      bandnum=sat[i].id;
      break;
    }
  }
  var source = layer.getSource();
  if(layer.originalBase64==undefined){
    layer.originalBase64 = source.getUrl();
  }
  var canvasA = document.createElement('canvas');
  canvasA.width=file.data.width;
  canvasA.height=file.data.height;
  var ctxA = canvasA.getContext("2d");
  var imageObj = new Image();
  imageObj.onload = function() {
    ctxA.drawImage(imageObj, 0, 0);
    var imageData = ctxA.getImageData(0, 0, file.data.width, file.data.height);
    var j=0;
    var min=999999;
    var max = 0;
    for(var k=0;k<file.data.bands[bandnum].length;k++){
      if(file.data.bands[bandnum][k]>max){
        max=file.data.bands[bandnum][k];
      }
      if(file.data.bands[bandnum][k]<min){
        min=file.data.bands[bandnum][k];
      }
    }
    var abs = max-min;
    for(var i=0;i<imageData.data.length;i+=4){
      imageData.data[i+0] = ((255*(file.data.bands[bandnum][j]-min))/abs)+50;
      imageData.data[i+1] = ((255*(file.data.bands[bandnum][j]-min))/abs)+50;
      imageData.data[i+2] = ((255*(file.data.bands[bandnum][j]-min))/abs)+50;
      imageData.data[i+3] = 255;
      j++
    }
    ctxA.putImageData(imageData,0,0);
    var base64img=canvasA.toDataURL("image/png");
    var newsource = new Static({
      url: base64img,
      imageExtent: file.data.bbox,
      projection: 'EPSG:'+file.data.epsg
    });
    layer.setSource(newsource);
  }
  imageObj.src = layer.originalBase64;
  console.log(sat);
  console.log(bandName);
}



export default GL;