class User implements DataField {
  private _id: string;
  private _forename: string;
  private _surname: string;
  private _phoneNumber: number;
  private _email: string;

  constructor(
    id: string,
    forename: string,
    surname: string,
    phonNumber: number,
    email: string
  ) {
    this._id = id;
    this._forename = forename;
    this._surname = surname;
    this._phoneNumber = phonNumber;
    this._email = email;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get forename(): string {
    return this._forename;
  }
  public set forename(value: string) {
    this._forename = value;
  }

  public get surname(): string {
    return this._surname;
  }
  public set surname(value: string) {
    this._surname = value;
  }

  public get phoneNumber(): number {
    return this._phoneNumber;
  }
  public set phoneNumber(value: number) {
    this._phoneNumber = value;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
}
