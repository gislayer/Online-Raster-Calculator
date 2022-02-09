//import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {FullScreen, defaults as defaultControls, Zoom, ScaleLine} from 'ol/control';


var GL = {
    map:false,
    basemap:false,
    controls:{
        zoom:false,
        fullscreen:false,
        scale:false
    }
    
};

GL.initMap = function(){
    this.controls.zoom = new Zoom();
    this.controls.fullscreen = new FullScreen();
    this.controls.scale = new ScaleLine();
    this.basemap = new TileLayer({
        source: new XYZ({
            url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
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


GL.loadGeoTIFF = function(){
    
}



export default GL;