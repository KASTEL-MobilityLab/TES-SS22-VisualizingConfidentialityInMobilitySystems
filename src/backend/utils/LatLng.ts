import { Expose } from "class-transformer";

/**
 * A LatLng represents a point on a map with a given latitude and longitude.
 */
export class LatLng {
  @Expose()
  readonly latitude: number;
  @Expose()
  readonly longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
