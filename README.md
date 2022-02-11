# Online Raster Calculator & Remote Sensing Image Analysis
#### Project Website : [rastercalculator.gislayer.com](https://rastercalculator.gislayer.com/ "https://rastercalculator.gislayer.com/")

This feature has been taken from GISLayer's Web Based GIS Software and rearranged via a special web page.  It is made publicly available as a guide for those writing similar apps as open source.

You can also submit your suggestions to us with the "Feedback" button on the website.  This software will now develop in an open source manner. Announced to software developers who want to join us

[![si sd](sd "si sd")](https://static.remove.bg/remove-bg-web/3a7401e33933f092e5fea5ef460b0cfd79d85fe8/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png "si sd")

## Data Loading Methods
This feature only works for .tif and .geotiff files. We added to package.json The **[geotiff.js](https://www.npmjs.com/package/geotiff "geotiff.js")** library for used to read these files. Also Thank you to the creators of this library.

- Laoding From Computer
- Loading From URL

## Available Satellite Images
We have added commonly used satellite images to the system, but if there is a satellite image you want to add, please contact us with the band information of this image. 

We will add a Custom calculator so that you can use remote sensing images, where you know the band order and how to use it.

- Sentinel-2 MSI
- Landsat 5 TM
- Landsat 8 OLI
- BGRI
- IBGR

## Raster Data Analysis
We know that not every analysis is here. We want you to know that we are open to user suggestions. We have added familiar image analyzes to the software. We will also add here a calculator tool for custom satellite images. 
- NDVI : Normalized difference vegetation index
- NDWI : Normalized difference water index
- NBR : Normalized Burn Ratio
- NPCRI : The Normalized Pigment Chlorophyll Ratio Index
- NDSI : The Normalized Difference Snow Index
- NDGI : Normalized Difference Greenness Index
- NDMI : Normalized Difference Moisture Index

## Analysis of Single Bands
After uploading the tif file, the existing bands will be listed above. On the top right of the software, there are color palettes **[(plotty library)](https://www.npmjs.com/package/plotty "(plotty library)")**. You can get an idea of your analysis by choosing the color palette that suits you and looking at the legend scale. When you hover over the band buttons, a popup will show you what information the band has. 

## Future Planning
-  False Color Analysis
- Custom Band Calculator

### Developers
- [Fullstack GIS Developer Ali Kilic](https://www.linkedin.com/in/alikilicharita/ "Ali Kilic") - Linkedin

#####Other Important Software
- [GISLayer Web Based GIS SaaS Project](https://editor.gislayer.com/ "GISLayer Web Based GIS SaaS Project")
- [BlueGIS Mobile GIS Software](https://play.google.com/store/apps/details?id=com.gislayer.bluegis&hl=en_US&gl=US "BlueGIS Mobile GIS Software")