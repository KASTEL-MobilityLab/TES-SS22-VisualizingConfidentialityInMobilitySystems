import type { Payment } from "../Payment";
import type { Trip } from "../Trip";
import { PaymentType } from "../types";

/**
 * The Cash class. This can only be used as an offline payment.
 */
export class Cash implements Payment {
  readonly id: string;
  readonly tripId: string;
  readonly trip: Trip;
  readonly paymentType: PaymentType = PaymentType.offline;

  constructor(id: string, tripId: string, trip: Trip) {
    this.id = id;
    this.tripId = tripId;
    this.trip = trip;
  }
}
