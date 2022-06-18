export class DataPackage {
  readonly fieldName: string;
  readonly value: string;

  constructor(fieldName: string, value: string) {
    this.fieldName = fieldName;
    this.value = value;
  }
}
