// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose } from "class-transformer";

/**
 * A LatLng represents a point on a map with a given latitude and longitude.
 */
export class LatLng {
  @Expose({ name: "lat" })
  readonly latitude: number;

  @Expose({ name: "lng" })
  readonly longitude: number;

  /**
   * Creates a new LatLng with the given latitude and longitude.
   *
   * @param latitude Latitude of the point
   * @param longitude Longitude of the point
   */
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
