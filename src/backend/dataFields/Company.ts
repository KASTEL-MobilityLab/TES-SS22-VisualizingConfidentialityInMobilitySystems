// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose } from "class-transformer";
import { DataField } from "./DataField";

/**
 * The Company class. A Company has an id and a name.
 */
export class Company extends DataField {
  @Expose()
  readonly name: string;

  /**
   * Creates a new Company.
   * @param id the id of the company.
   * @param name the name of the company.
   */
  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}
