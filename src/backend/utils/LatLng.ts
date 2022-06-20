import { Expose } from "class-transformer";

/**
 * A LatLng represents a point on a map with a given latitude and longitude.
 */
export class LatLng {
  @Expose({ name: "lat" })
  readonly latitude: number;

  @Expose({ name: "lng" })
  readonly longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
