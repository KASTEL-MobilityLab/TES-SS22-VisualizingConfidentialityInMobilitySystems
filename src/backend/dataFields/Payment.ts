import { DataField } from "@/backend/dataFields/DataField";
import { Trip } from "@/backend/dataFields/Trip";
import { PaymentType } from "@/backend/dataFields/types";
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
