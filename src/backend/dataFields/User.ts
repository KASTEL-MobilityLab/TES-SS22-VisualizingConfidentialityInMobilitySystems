import { Expose } from "class-transformer";
import { DataField } from "./DataField";

/**
 * The User class.
 */
export class User extends DataField {
  @Expose()
  readonly forename: string;

  @Expose()
  readonly surname: string;

  @Expose()
  readonly phoneNumber: string;

  @Expose()
  readonly email: string;

  constructor(
    id: string,
    forename: string,
    surname: string,
    phoneNumber: string,
    email: string
  ) {
    super(id);
    this.forename = forename;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }

  getFullName(): string {
    return `${this.forename} ${this.surname}`;
  }
}
