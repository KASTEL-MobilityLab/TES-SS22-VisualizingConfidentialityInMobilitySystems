import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { VehicleStatus } from "../dataFields/types";
import { User } from "../dataFields/User";
import { AvailableData, DataLoader, getData } from "../DataLoader";
import { Company } from "./../dataFields/Company";
import { EScooter } from "./../dataFields/vehicles/EScooter";

describe("Async get Data", async () => {
  it("invalid fileName", async () =>
    await expect(getData("foo")).rejects.toThrow(
      "Could not import data from src/data/foo.json"
    ));

  it("valid fileName", async () => {
    const companies = await getData(AvailableData.companies);
    expect(companies[0]).toMatchObject({
      id: "C01",
      name: "Fire Runner",
    });
  });
});

describe("DataLoader", async () => {
  const dl = new DataLoader();
  const firstCompany = new Company("C01", "Fire Runner");
  const firstUser = new User(
    "U01",
    "Theo",
    "Schweitzer",
    "02256708826",
    "theo.schweitzer@gmail.com"
  );
  const firstVehicle = new EScooter(
    "V01",
    firstCompany.id,
    84,
    89,
    VehicleStatus.active,
    74,
    firstCompany
  );

  it("load all companies", async () => {
    const companies = await dl.loadAllCompanies();
    const loadedCompany = companies[0];
    expect(loadedCompany).toBeInstanceOf(Company);
    expect(loadedCompany).toEqual(firstCompany);
  });

  it("load all users", () => {
    const users = dl.loadAllUsers();
    const loadedUser = users[0];
    expect(loadedUser).toBeInstanceOf(User);
    expect(loadedUser).toEqual(firstUser);
  });

  it("load all E-Scooters", () => {
    const vehicles = dl.loadAllVehicles();
    const loadedVehicle: EScooter = <EScooter>vehicles[0];
    loadedVehicle.company = firstCompany;

    expect(loadedVehicle).toBeInstanceOf(EScooter);
    expect(loadedVehicle.status).toBe(VehicleStatus.active);

    expect(loadedVehicle).toEqual(firstVehicle);
  });
});
