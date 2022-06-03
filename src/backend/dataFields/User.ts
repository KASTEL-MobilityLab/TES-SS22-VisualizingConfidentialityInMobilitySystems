import type { DataField } from "./DataField";

/**
 * The User class.
 */
export class User implements DataField {
  readonly id: string;
  readonly forename: string;
  readonly surname: string;
  readonly phoneNumber: number;
  readonly email: string;

  constructor(
    id: string,
    forename: string,
    surname: string,
    phonNumber: number,
    email: string
  ) {
    this.id = id;
    this.forename = forename;
    this.surname = surname;
    this.phoneNumber = phonNumber;
    this.email = email;
  }
}