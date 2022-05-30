import type { LatLng } from "./utils/LatLng";

/**
 * The Route class.
 */
export class Route {
  readonly start: LatLng;
  readonly end: LatLng;

  constructor(start: LatLng, end: LatLng) {
    this.start = start;
    this.end = end;
  }
}
