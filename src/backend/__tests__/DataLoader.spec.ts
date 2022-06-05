import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { VehicleStatus, VehicleType } from "../dataFields/types";
import { User } from "../dataFields/User";
import type { Vehicle } from "../dataFields/Vehicle";
import { IndividualVehicle } from "../dataFields/vehicles/IndividualVehicle";
import { PublicVehicle } from "../dataFields/vehicles/PublicVehicle";
import { Train } from "../dataFields/vehicles/Train";
import { AvailableData, DataLoader, getData } from "../DataLoader";
import { Company } from "./../dataFields/Company";
import { EScooter } from "./../dataFields/vehicles/EScooter";

describe.concurrent("Async get Data", async () => {
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

describe.concurrent("DataLoader", async () => {
  const dl = new DataLoader();
  const fireRunnerCompany = new Company("C01", "Fire Runner");
  const kVVCompany = new Company("C03", "KVV");
  const firstUser = new User(
    "U01",
    "Theo",
    "Schweitzer",
    "02256708826",
    "theo.schweitzer@gmail.com"
  );
  const firstEScooter = new EScooter(
    "V01",
    fireRunnerCompany.id,
    84,
    89,
    VehicleStatus.active,
    74,
    fireRunnerCompany
  );
  const firstTrain = new Train("V04", "C03", kVVCompany);

  it("load all companies", async () => {
    const companies = await dl.loadAllCompanies();
    const loadedCompany = companies[0];
    expect(loadedCompany).toBeInstanceOf(Company);
    expect(loadedCompany).toEqual(fireRunnerCompany);
  });

  it("load all users", () => {
    const users = dl.loadAllUsers();
    const loadedUser = users[0];
    expect(loadedUser).toBeInstanceOf(User);
    expect(loadedUser).toEqual(firstUser);
    expect(loadedUser.getFullName()).toBe(firstUser.getFullName());
  });

  describe("load all Vehicles", () => {
    const vehicles = dl.loadAllVehicles();

    const loadedEScooter: Vehicle = vehicles[0];
    loadedEScooter.company = fireRunnerCompany;
    const loadedTrain: Vehicle = vehicles[3];
    loadedTrain.company = kVVCompany;

    it("convert all EScooters", () => {
      for (const veh of vehicles.filter(
        (v) => v.type === VehicleType.escooter
      )) {
        expect(veh).toBeInstanceOf(IndividualVehicle);
        expect(veh).toBeInstanceOf(EScooter);
      }
    });
    it("equality of first escooter", () => {
      expect((<EScooter>loadedEScooter).status).toBe(VehicleStatus.active);
      expect((<EScooter>loadedEScooter).type).toBe(VehicleType.escooter);
      expect(loadedEScooter).toEqual(firstEScooter);
    });

    it("convert all Trains", () => {
      for (const veh of vehicles.filter((v) => v.type === VehicleType.train)) {
        expect(veh).toBeInstanceOf(PublicVehicle);
        expect(veh).toBeInstanceOf(Train);
      }
    });
    it("equality of first train", () => {
      expect(loadedTrain).toEqual(firstTrain);
    });
  });
});
