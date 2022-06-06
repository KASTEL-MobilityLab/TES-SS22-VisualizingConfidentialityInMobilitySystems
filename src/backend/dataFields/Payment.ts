import { Exclude, Expose } from "class-transformer";
import { DataField } from "@/backend/dataFields/DataField";
import { Trip } from "@/backend/dataFields/Trip";
import { PaymentType } from "@/backend/dataFields/types";

/**
 * The abstract class every payment must extend.
 */
export abstract class Payment extends DataField {
  @Expose()
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
    if (this._trip === undefined) {
      throw Error("Trip has not been set yet.");
    }
    return this._trip;
  }

  set trip(trip: Trip) {
    this.checkForeignKeyReferences(trip, this.tripId);
    this._trip = trip;
  }
}
