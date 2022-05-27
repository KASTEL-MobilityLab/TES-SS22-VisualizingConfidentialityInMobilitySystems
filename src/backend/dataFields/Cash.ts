class Cash implements Payment {
  private _id: string;
  private _tripId: string;

  constructor(id: string, tripId: string) {
    this._id = id;
    this._tripId = tripId;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get tripId(): string {
    return this._tripId;
  }
  public set tripId(value: string) {
    this._tripId = value;
  }
}
