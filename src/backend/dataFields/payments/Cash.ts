import { Payment } from "../Payment";
import type { Trip } from "../Trip";
import { PaymentType } from "../types";

/**
 * The Cash class.
 */
export class Cash extends Payment {
  constructor(id: string, tripId: string, trip?: Trip) {
    super(PaymentType.cash, id, tripId, trip);
  }
}
