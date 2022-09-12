// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose, Type } from "class-transformer";
import type { Trip } from "../Trip";
import { PaymentType } from "../types";
import { NonCash } from "./NonCash";

/**
 * The CreditCard class. A credit card contains several attributes like provider or card number
 * and can be used as an offline or online payment.
 */
export class CreditCard extends NonCash {
  @Type(() => Date)
  @Expose()
  readonly expiryDate: Date;

  @Expose()
  readonly cardNumber: number;

  @Expose()
  readonly ccv: number;

  @Expose()
  readonly provider: string;

  /**
   * Creates a CreditCard payment instance.
   * @param cardNumber the card number of the credit card
   * @param ccv the ccv of the credit card
   * @param expiryDate the expiry date of the credit card
   * @param provider the provider of the credit card
   * @param id the unique identifier of the CreditCard instance
   * @param tripId the id of the trip in which this CreditCard instance is used
   * @param trip the Trip instance in which this CreditCard instance is used
   */
  constructor(
    cardNumber: number,
    ccv: number,
    expiryDate: Date,
    provider: string,
    id: string,
    tripId: string,
    trip?: Trip
  ) {
    super(PaymentType.CreditCard, id, tripId, trip);
    this.provider = provider;
    this.cardNumber = cardNumber;
    this.ccv = ccv;
    this.expiryDate = expiryDate;
  }
}
