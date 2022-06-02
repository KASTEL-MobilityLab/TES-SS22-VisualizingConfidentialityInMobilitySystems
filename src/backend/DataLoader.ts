import { User } from "@/backend/dataFields/User";
import { plainToInstance, type ClassConstructor } from "class-transformer";
import { Trip } from "./dataFields/Trip";

export class DataLoader {
  loadUsers(): User[] {
    return loadTransform(User, "users.json");
  }
  loadTrips() {
    return loadTransform(Trip, "trips.json");
  }

  // TODO: the rest of the data fields
}

/**
 * Asynchronously fetches JSON Data from a given path.
 *
 * @param path the path to a JSON file
 * @returns a Promise of Objects
 */
export async function loadJSON(path: string): Promise<Record<any, string>[]> {
  // TODO: is this return type correct?
  return fetch(path)
    .then((res) => res.json())
    .then((data) => data);
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
  const jsonData: Record<string, any>[] = loadJSON(`@/backend/data/${path}`); // FIX: does not work like this (incorrect type)
  return plainToInstance(cls, jsonData);
}
