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

  /**
   * Creates a new Route.
   * @param id the id of the route.
   * @param start the starting point of the route.
   * @param end the ending point of the route.
   * @param waypoints optionally, the waypoints that are passed through.
   * @param description optionally, the description of the route.
   */
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
