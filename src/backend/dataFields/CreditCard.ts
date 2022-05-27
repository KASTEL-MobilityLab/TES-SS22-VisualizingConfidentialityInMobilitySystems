class CreditCard implements NonCash {
  private _id: string;
  private _tripId: string;
  private _provider: string;
  private _cardNumber: number;
  private _ccv: number;
  private _expiryDate: Date;

  constructor(
    id: string,
    tripId: string,
    provider: string,
    cardNumber: number,
    ccv: number,
    expiryDate: Date
  ) {
    this._id = id;
    this._tripId = tripId;
    this._provider = provider;
    this._cardNumber = cardNumber;
    this._ccv = ccv;
    this._expiryDate = expiryDate;
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

  public get provider(): string {
    return this._provider;
  }
  public set provider(value: string) {
    this._provider = value;
  }

  public get cardNumber(): number {
    return this._cardNumber;
  }
  public set cardNumber(value: number) {
    this._cardNumber = value;
  }

  public get ccv(): number {
    return this._ccv;
  }
  public set ccv(value: number) {
    this._ccv = value;
  }

  public get expiryDate(): Date {
    return this._expiryDate;
  }
  public set expiryDate(value: Date) {
    this._expiryDate = value;
  }
}
