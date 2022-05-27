class Trips implements DataField {
  private _id: string;
  private _routeId: string;
  private _vehicleId: string;
  private _userId: string;
  private _paymentId: string;
  private _price: number;
  private _startTime: string;
  private _endTime: string;

  constructor(
    id: string,
    routeId: string,
    vehicleId: string,
    userId: string,
    paymentId: string,
    price: number,
    startTime: string,
    endTime: string
  ) {
    this._id = id;
    this._routeId = routeId;
    this._vehicleId = vehicleId;
    this._userId = userId;
    this._paymentId = paymentId;
    this._price = price;
    this._startTime = startTime;
    this._endTime = endTime;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get routeId(): string {
    return this._routeId;
  }
  public set routeId(value: string) {
    this._routeId = value;
  }

  public get vehicleId(): string {
    return this._vehicleId;
  }
  public set vehicleId(value: string) {
    this._vehicleId = value;
  }

  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }

  public get paymentId(): string {
    return this._paymentId;
  }
  public set paymentId(value: string) {
    this._paymentId = value;
  }

  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }

  public get startTime(): string {
    return this._startTime;
  }
  public set startTime(value: string) {
    this._startTime = value;
  }

  public get endTime(): string {
    return this._endTime;
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
}
