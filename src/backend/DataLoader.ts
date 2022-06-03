import { User } from "@/backend/dataFields/User";
import { plainToInstance, type ClassConstructor } from "class-transformer";
import { readFile } from "fs/promises";
import { Trip } from "./dataFields/Trip";

/**
 * Asynchronously reads JSON Data from a given path.
 *
 * @param path the path to a JSON file
 * @returns a Promise of record<string, any>
 */
export async function readJsonFile(
  path: string
): Promise<Record<string, unknown>[]> {
  const file = await readFile(path, "utf8");
  return JSON.parse(file);
}

/**
 * Loads the JSON data from a given path and tries to transform it into instances of `cls`
 *
 * @param cls The created objects will be of type `cls`.
 * @param path The path to a Json file. The file has to be in the src/backend/data/ directory
 * @returns an array of Type `cls`
 */
export async function loadTransform<T>(
  cls: ClassConstructor<T>,
  path: string
): Promise<T[]> {
  const data = await readJsonFile(path);
  const transformedData: T[] = plainToInstance(cls, data);
  return transformedData;
}

export class DataLoader {
  private readonly DATA_PATH = "src/data/";
  private readonly USER_DATA_PATH = this.DATA_PATH + "users.json";

  async loadUsers(): Promise<User[]> {
    return loadTransform<User>(User, this.USER_DATA_PATH);
  }
  loadTrips(): Trip[] {
    throw Error("Not implemented");
  }
  // TODO: the rest of the data fields
}
