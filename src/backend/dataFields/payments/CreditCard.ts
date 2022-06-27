import { Expose, Type } from "class-transformer";
import type { Trip } from "../Trip";
import { PaymentType } from "../types";
import { NonCash } from "./NonCash";

/**
 * The CreditCard class. A credit card contains several attributes like provider or card number
 * and can be used as an offline or online payment.
 */
export class CreditCard extends NonCash {
  @Expose()
  readonly cardNumber: number;

  @Expose()
  readonly ccv: number;

  @Type(() => Date)
  @Expose()
  readonly expiryDate: Date;

  @Expose()
  readonly provider: string;

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
