class Train implements PublicVehicle {
  private _id: string;
  private _companyId: string;

  constructor(id: string, companyId: string) {
    this._id = id;
    this._companyId = companyId;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get companyId(): string {
    return this._companyId;
  }
  public set companyId(value: string) {
    this._companyId = value;
  }
}
