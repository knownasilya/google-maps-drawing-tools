# google-maps-drawing-tools

Have you noticed that Google Maps has two ways to draw and both have different options? Well this
library tries to have a unified way to draw that allows exporting geojson and restoring drawings from
existing geojson.

## Usage

```js
import DrawingManager from 'google-maps-drawing-tools';

const map = new google.maps.Map(element, mapOptions);
const manager = new DrawingManager({ map });

// Load geojson
manager.data.addGeoJson(geoJson);

// Can also use 'line' and 'circle'
manager.changeTool('polygon');

// Draw a polygon on the map..

manager.data.toGeoJson((geojson) => {
  // access the geojson
});
```

## TODO

- [ ] Add Rectangle
- [ ] Add Marker
- [ ] Add Text Label
- [ ] Add measurement option
- [ ] Add measurement units option
- [ ] etc..