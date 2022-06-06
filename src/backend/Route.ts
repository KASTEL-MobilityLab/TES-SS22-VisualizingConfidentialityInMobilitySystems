import { Expose, Type } from "class-transformer";
import { DataField } from "./dataFields/DataField";
import { LatLng } from "./utils/LatLng";

/**
 * The Route class.
 */
export class Route extends DataField {
  @Type(() => LatLng)
  @Expose()
  readonly start: LatLng;

  @Type(() => LatLng)
  @Expose()
  readonly end: LatLng;

  constructor(id: string, start: LatLng, end: LatLng) {
    super(id);
    this.start = start;
    this.end = end;
  }
}
