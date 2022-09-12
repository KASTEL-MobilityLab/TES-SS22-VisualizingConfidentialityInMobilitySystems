import { DataField } from "@/backend/dataFields/DataField";
import { Trip } from "@/backend/dataFields/Trip";
import { PaymentType } from "@/backend/dataFields/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Exclude, Expose } from "class-transformer";

/**
 * The abstract class every payment must extend.
 */
export abstract class Payment extends DataField {
  @Expose({ name: "type" })
  readonly paymentType: PaymentType;

  @Expose()
  readonly tripId: string;

  @Exclude()
  private _trip?: Trip;

  /**
   * Creates a new Payment.
   * @param paymentType the typ in which the payment is performed.
   * @param id the id of the payment.
   * @param tripId the id of the trip the payment belongs to.
   * @param trip the trip the payment belongs to.
   */
  constructor(
    paymentType: PaymentType,
    id: string,
    tripId: string,
    trip?: Trip
  ) {
    super(id);
    this.paymentType = paymentType;
    this.tripId = tripId;
    if (trip !== undefined) {
      this._trip = trip;
    }
  }

  get trip() {
    return this._trip;
  }

  set trip(trip: Trip | undefined) {
    if (!trip) {
      throw new Error("Cannot set the trip of this payment to undefined.");
    }
    this.checkForeignKeyReferences(trip, this.tripId);
    this._trip = trip;
  }
}
