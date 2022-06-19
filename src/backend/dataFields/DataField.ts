import { Expose } from "class-transformer";

/**
 * The top level interface that every data field (like Trip or Payment) has to implement.
 */
export abstract class DataField {
  @Expose()
  readonly _id: string;

  constructor(_id: string) {
    this._id = _id;
  }

  /**
   * Method that checks whether the saved id of an other DataField within the DataField matches the intended id of the other DataField.
   * @param storedDataField An implementation of a DataField (e.g. an User, a Trip, ...) that is stored within an other DataField
   * @param dataFieldId Id that is stored within a DataField and that is tested
   */
  checkForeignKeyReferences(storedDataField: DataField, dataFieldId: string) {
    if (storedDataField._id !== dataFieldId) {
      throw Error(
        `Cannot set ${storedDataField.constructor.name} with ${storedDataField.constructor.name} Id ${storedDataField._id}:
         Id does not match the ${storedDataField.constructor.name} id of this ${this.constructor.name} id ${dataFieldId}`
      );
    }
  }
}
