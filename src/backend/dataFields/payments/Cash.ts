import { Payment } from "../Payment";
import type { Trip } from "../Trip";
import { PaymentType } from "../types";

/**
 * The Cash class.
 */
export class Cash extends Payment {
  /**
   * Creates a Cash payment instance.
   * @param id the unique identifier of the Cash instance
   * @param tripId the id of the trip in which this Cash instance is used
   * @param trip the Trip instance in which this Cash instance is used
   */
  constructor(id: string, tripId: string, trip?: Trip) {
    super(PaymentType.Cash, id, tripId, trip);
  }
}
