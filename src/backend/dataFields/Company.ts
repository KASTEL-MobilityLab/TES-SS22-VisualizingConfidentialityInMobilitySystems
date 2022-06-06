import { Expose } from "class-transformer";
import { DataField } from "./DataField";

/**
 * The Company class. A Company has an id and a name.
 */
export class Company extends DataField {
  @Expose()
  readonly name: string;

  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}
