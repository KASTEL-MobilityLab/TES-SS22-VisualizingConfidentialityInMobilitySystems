import type { DataField } from "./DataField";

/**
 * The Company class. A Company has an id and a name.
 */
export class Company implements DataField {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
