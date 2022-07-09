import { Exclude, Expose } from "class-transformer";
import { Role } from "../Role";
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
  readonly phoneNumber: number;

  @Expose()
  readonly email: string;

  @Exclude()
  readonly role: Role;

  constructor(
    id: string,
    forename: string,
    surname: string,
    phoneNumber: number,
    email: string
  ) {
    super(id);
    this.forename = forename;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.role = Role.User;
  }

  getFullName(): string {
    return `${this.forename} ${this.surname}`;
  }
}
