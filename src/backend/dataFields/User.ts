// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose } from "class-transformer";
import { DataField } from "./DataField";

/**
 * The User class.
 */
export class User extends DataField {
  private static readonly NAME_SEPARATOR = " ";
  @Expose()
  readonly forename: string;

  @Expose()
  readonly surname: string;

  @Expose()
  readonly phoneNumber: number;

  @Expose()
  readonly email: string;

  /**
   * Creates a new User.
   * @param id the id of the user.
   * @param forename the forename of the user.
   * @param surname the surname of the user.
   * @param phoneNumber the pone number of the user.
   * @param email the email of the user.
   */
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
  }

  /**
   * Getter for the full name of the user.
   * @returns the full name of the user which is composed of the forename and the surname.
   */
  getFullName(): string {
    return `${this.forename}` + User.NAME_SEPARATOR + `${this.surname}`;
  }
}
