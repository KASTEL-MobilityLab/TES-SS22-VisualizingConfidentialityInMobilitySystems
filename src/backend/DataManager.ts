import { DataLoader } from "./DataLoader";

export class DataManager {
  readonly dataLoader: DataLoader;

  constructor() {
    this.dataLoader = new DataLoader();
  }
}
