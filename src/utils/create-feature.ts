import guid from './guid';

export default function createFeature(geometry: google.maps.Data.Geometry): google.maps.Data.Feature {
  let feature = new google.maps.Data.Feature({
    id: guid(),
    geometry
  });

  return feature;
}
