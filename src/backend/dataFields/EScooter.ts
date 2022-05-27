class EScooter implements IndividualVehicle {
  private _id: string;
  private _type: ["e-scooter", "bike"];
  private _companyId: string;
  private _condition: number;
  private _batteryCondition: number;
  private _status: ["active", "inactive"];
  private _batteryLevel: number;

  constructor(
    id: string,
    type: ["e-scooter", "bike"],
    companyId: string,
    condition: number,
    batteryCondition: number,
    status: ["active", "inactive"],
    batteryLevel: number
  ) {
    this._id = id;
    this._type = type;
    this._companyId = companyId;
    this._condition = condition;
    this._batteryCondition = batteryCondition;
    this._status = status;
    this._batteryLevel = batteryLevel;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get type(): ["e-scooter", "bike"] {
    return this._type;
  }
  public set type(value: ["e-scooter", "bike"]) {
    this._type = value;
  }

  public get companyId(): string {
    return this._companyId;
  }
  public set companyId(value: string) {
    this._companyId = value;
  }

  public get condition(): number {
    return this._condition;
  }
  public set condition(value: number) {
    this._condition = value;
  }

  public get batteryCondition(): number {
    return this._batteryCondition;
  }
  public set batteryCondition(value: number) {
    this._batteryCondition = value;
  }

  public get status(): ["active", "inactive"] {
    return this._status;
  }
  public set status(value: ["active", "inactive"]) {
    this._status = value;
  }

  public get batteryLevel(): number {
    return this._batteryLevel;
  }
  public set batteryLevel(value: number) {
    this._batteryLevel = value;
  }
}
