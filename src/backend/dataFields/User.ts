import { Expose } from "class-transformer";
import type { DataField } from "./DataField";

/**
 * The User class.
 */
export class User implements DataField {
  @Expose()
  readonly id: string;
  @Expose()
  readonly forename: string;
  @Expose()
  readonly surname: string;
  @Expose()
  readonly phoneNumber: number;
  @Expose()
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

  getName(): string {
    return `${this.forename} ${this.surname}`;
  }
}
