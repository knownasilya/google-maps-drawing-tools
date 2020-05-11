const d2r = Math.PI / 180; // degrees to radians
const r2d = 180 / Math.PI; // radians to degrees
const earthsRadius = 3963; // 3963 is the radius of the earth in miles
const metersToMilesMultiplier = 0.000621371;

export interface CreateCircleOptions {
  lat: number;
  lng: number;
  radius: number; // meters
  points?: number;
}

export default function createCircle({
  lat,
  lng,
  radius,
  points = 32,
}: CreateCircleOptions): google.maps.LatLng[] {
  // radius in miles
  radius = radius * metersToMilesMultiplier;

  // find the raidus in lat/lon
  let rlat = (radius / earthsRadius) * r2d;
  let rlng = rlat / Math.cos(lat * d2r);
  let path = [];

  // one extra here makes sure we connect the
  for (let i = 0; i < points + 1; i++) {
    let theta = Math.PI * (i / (points / 2));
    let ex = lng + rlng * Math.cos(theta); // center a + radius x * cos(theta)
    let ey = lat + rlat * Math.sin(theta); // center b + radius y * sin(theta)

    path.push(new google.maps.LatLng(ey, ex));
  }

  return path;
}
