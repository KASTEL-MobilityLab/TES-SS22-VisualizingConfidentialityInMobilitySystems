import { Expose } from "class-transformer";
import type { Trip } from "../Trip";
import { PaymentType } from "../types";
import { NonCash } from "./NonCash";

/**
 * The PayPal class. This can only be used as an online payment.
 */
export class PayPal extends NonCash {
  @Expose()
  readonly userName: string;

  constructor(userName: string, id: string, tripId: string, trip?: Trip) {
    super(PaymentType.paypal, PaymentType.paypal, id, tripId, trip);
    this.userName = userName;
  }
}
