import createCircle from './create-circle';
import createFeature from './create-feature';

const { Polygon } = google.maps.Data;
const { LatLng } = google.maps;

export type Overlay = google.maps.Marker | google.maps.Polygon | google.maps.Polyline | google.maps.Rectangle | google.maps.Circle;

export default function overlayToFeature(overlay: Overlay) {
  let paths: google.maps.LatLng[][] = [];

  if (overlay instanceof google.maps.Circle) {
    let center = overlay.getCenter();
    let radius = overlay.getRadius();
    let circle = createCircle({
      lat: center.lat() as number,
      lng: center.lng() as number,
      radius: radius as number
    });

    paths = [circle];
  } else if (overlay instanceof google.maps.Rectangle) {
    let bounds = overlay.getBounds();
    let ne = bounds.getNorthEast();
    let sw = bounds.getSouthWest();
    let nw = new LatLng(ne.lat(), sw.lng());
    let se = new LatLng(sw.lat(), ne.lng());
    let path = [ne, se, sw, nw];

    paths = [path];
  }

  let polygon = new Polygon(paths);
  let feature = createFeature(polygon);

  return feature;
}
