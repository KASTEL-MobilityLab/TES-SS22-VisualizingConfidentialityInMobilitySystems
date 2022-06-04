import type { DataField } from "./DataField";

/**
 * The User class.
 */
export class User implements DataField {
  readonly id: string;
  readonly forename: string;
  readonly surname: string;
  readonly phoneNumber: string;
  readonly email: string;

  constructor(
    id: string,
    forename: string,
    surname: string,
    phoneNumber: string,
    email: string
  ) {
    this.id = id;
    this.forename = forename;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }

  getName(): string {
    return `${this.forename} ${this.surname}`;
  }
}
