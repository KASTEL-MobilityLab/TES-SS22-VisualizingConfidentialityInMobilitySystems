import { Exclude, Expose } from "class-transformer";
import { Role } from "../Role";
import { DataField } from "./DataField";

/**
 * The City class. A City has an id and a name. A City provides aggregated data about the used public and individual vehicle.
 */
export class City extends DataField {
  @Expose()
  readonly name: string;

  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}
