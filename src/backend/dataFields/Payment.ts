import type { DataField } from "./DataField";
import type { Trip } from "./Trip";

/**
 * The payment method that is associated with a given Trip.
 */
export interface Payment extends DataField {
  readonly id: string;
  readonly tripId: string;
  readonly trip: Trip;
}
