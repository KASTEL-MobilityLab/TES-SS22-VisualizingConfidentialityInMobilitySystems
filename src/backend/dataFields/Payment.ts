import type { DataField, Trip } from "@/backend/dataFields";

/**
 * The payment method that is associated with a given Trip.
 */
export interface Payment extends DataField {
  readonly id: string;
  readonly tripId: string;
  readonly trip: Trip;
}
