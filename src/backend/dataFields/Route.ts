import { Expose, Type } from "class-transformer";
import { LatLng } from "../utils/LatLng";
import { DataField } from "./DataField";

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

  @Type(() => LatLng)
  @Expose()
  waypoints?: LatLng[];

  @Expose()
  description?: string;

  constructor(
    id: string,
    start: LatLng,
    end: LatLng,
    waypoints?: LatLng[],
    description?: string
  ) {
    super(id);
    this.start = start;
    this.end = end;
    this.waypoints = waypoints;
    this.description = description;
  }
}
