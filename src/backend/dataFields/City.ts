// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose } from "class-transformer";
import { DataField } from "./DataField";
import type { CompanyId } from "./types";

/**
 * The City class. A City has an id and a name. A City provides aggregated data about the used public and individual vehicle.
 */
export class City extends DataField {
  @Expose()
  readonly name: string;

  /**
   * Creates a new City.
   * @param id the id the city.
   * @param name the name of the city.
   */
  constructor(id: CompanyId, name: string) {
    super(id);
    this.name = name;
  }
}
