// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose } from "class-transformer";

/**
 * The top level interface that every data field (like Trip or Payment) has to implement.
 */
export abstract class DataField {
  @Expose()
  readonly id: string;

  /**
   * Constructs a DataField
   * @param id the id of the DataField.
   */
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Method that checks whether the saved id of an other DataField within the DataField matches the intended id of the other DataField.
   * @param storedDataField An implementation of a DataField (e.g. an User, a Trip, ...) that is stored within an other DataField
   * @param dataFieldId Id that is stored within a DataField and that is tested
   */
  checkForeignKeyReferences(storedDataField: DataField, dataFieldId: string) {
    if (storedDataField.id !== dataFieldId) {
      throw Error(
        `Cannot set ${storedDataField.constructor.name} with ${storedDataField.constructor.name} Id ${storedDataField.id}:
         Id does not match the ${storedDataField.constructor.name} id of this ${this.constructor.name} id ${dataFieldId}`
      );
    }
  }
}
