import { Expose } from "class-transformer";
import { Payment } from "../Payment";
import type { Trip } from "../Trip";
import type { PaymentType } from "../types";

/**
 * This abstract class has to be extended by every Non cash payment like Creditcards.
 */
export abstract class NonCash extends Payment {
  @Expose()
  readonly provider: string;

  constructor(
    paymentType: PaymentType,
    provider: string,
    id: string,
    tripId: string,
    trip?: Trip
  ) {
    super(paymentType, id, tripId, trip);
    this.provider = provider;
  }
}
