class Company implements DataField {
  private _id: string;
  private _name: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get id(): string {
    return this.id;
  }
  public set id(value: string) {
    this.id = value;
  }
}
