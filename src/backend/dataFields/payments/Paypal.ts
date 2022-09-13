// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose } from "class-transformer";
import type { Trip } from "../Trip";
import { PaymentType, type PaymentId, type TripId } from "../types";
import { NonCash } from "./NonCash";

/**
 * The PayPal class. This can only be used as an online payment.
 */
export class PayPal extends NonCash {
  @Expose()
  readonly userName: string;

  /**
   * Creates a Paypal payment instance.
   * @param userName the user name of the corresponding Paypal account
   * @param id the unique identifier of the Paypal instance
   * @param tripId the id of the trip in which this Paypal instance is used
   * @param trip the Trip instance in which this Paypal instance is used
   */
  constructor(userName: string, id: PaymentId, tripId: TripId, trip?: Trip) {
    super(PaymentType.PayPal, id, tripId, trip);
    this.userName = userName;
  }
}
