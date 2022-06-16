export class DataPackage {
  fieldName: string;
  value: string;
  explanation?: string;
  currentVisibile?: boolean;

  constructor(
    fieldName: string,
    value: string,
    explanation?: string,
    currentVisible?: boolean
  ) {
    this.fieldName = fieldName;
    this.value = value;
    this.explanation = explanation;
    this.currentVisibile = currentVisible;
  }

  setCurrentVisible(currentVisibile: boolean) {
    this.currentVisibile = currentVisibile;
  }
}
