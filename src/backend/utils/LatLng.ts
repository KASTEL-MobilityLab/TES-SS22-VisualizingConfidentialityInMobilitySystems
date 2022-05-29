/**
 * A LatLng represents a point on a map with a given latitude and longitude.
 */
export class LatLng {
  readonly latitude: number;
  readonly longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
