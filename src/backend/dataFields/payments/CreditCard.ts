import type { Trip } from "../Trip";
import type { PaymentType } from "../types";
import type { NonCash } from "./NonCash";

/**
 * The CreditCard class. A credit card contains several attributes like provider or card number
 * and can be used as an offline or online payment.
 */
export class CreditCard implements NonCash {
  readonly id: string;
  readonly tripId: string;
  readonly provider: string;
  readonly cardNumber: number;
  readonly ccv: number;
  readonly expiryDate: Date;
  readonly paymentType: PaymentType;
  readonly trip: Trip;

  constructor(
    id: string,
    tripId: string,
    trip: Trip,
    provider: string,
    cardNumber: number,
    ccv: number,
    expiryDate: Date,
    paymentType: PaymentType
  ) {
    this.id = id;
    this.trip = trip;
    this.tripId = tripId;
    this.provider = provider;
    this.cardNumber = cardNumber;
    this.ccv = ccv;
    this.expiryDate = expiryDate;
    this.paymentType = paymentType;
  }
}
