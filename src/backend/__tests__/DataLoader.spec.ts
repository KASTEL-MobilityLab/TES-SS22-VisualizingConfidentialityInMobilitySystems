import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Company } from "../dataFields/Company";
import { VehicleStatus, VehicleType } from "../dataFields/types";
import { User } from "../dataFields/User";
import type { Vehicle } from "../dataFields/Vehicle";
import { EScooter } from "../dataFields/vehicles/EScooter";
import { IndividualVehicle } from "../dataFields/vehicles/IndividualVehicle";
import { PublicVehicle } from "../dataFields/vehicles/PublicVehicle";
import { Train } from "../dataFields/vehicles/Train";
import { AvailableData, DataLoader, getData } from "../DataLoader";

describe.concurrent("Async get Data", async () => {
  it("valid data path", async () => {
    const companies = await getData(AvailableData.companies);
    expect(companies[0]).toMatchObject({
      id: "C01",
      name: "Fire Runner",
    });
  });

  it("load risk data", async () => {
    // change later, when branch is merged
    // const risk = await getData(AvailableData.risks);
    // check if first element is loaded correctly
    //await expect(getData(AvailableData.risks)).rejects.toThrowError();
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
  const firstTrain = new Train(
    "V04",
    "C03",
    VehicleStatus.inactive,
    kVVCompany
  );

  it("load all companies", async () => {
    const companies = await dl.loadAllCompanies();
    const loadedCompany = companies[0];
    expect(loadedCompany).toBeInstanceOf(Company);
    expect(loadedCompany).toEqual(fireRunnerCompany);
  });

  it("load all users", async () => {
    const users = await dl.loadAllUsers();
    const loadedUser = users[0];
    expect(loadedUser).toBeInstanceOf(User);
    expect(loadedUser).toEqual(firstUser);
    expect(loadedUser.getFullName()).toBe(firstUser.getFullName());
  });

  describe("load all Vehicles", async () => {
    const vehicles = await dl.loadAllVehicles();

    const loadedEScooter: Vehicle = vehicles[0];
    loadedEScooter.company = fireRunnerCompany;
    const loadedTrain: Vehicle = vehicles[3];
    loadedTrain.company = kVVCompany;

    it("convert all EScooters", async () => {
      for (const veh of vehicles.filter(
        (v) => v.type === VehicleType.escooter
      )) {
        expect(veh).toBeInstanceOf(IndividualVehicle);
        expect(veh).toBeInstanceOf(EScooter);
      }
    });
    it("equality of first escooter", async () => {
      expect((<EScooter>loadedEScooter).status).toBe(VehicleStatus.active);
      expect((<EScooter>loadedEScooter).type).toBe(VehicleType.escooter);
      expect(loadedEScooter).toEqual(firstEScooter);
    });

    it("convert all Trains", async () => {
      for (const veh of vehicles.filter((v) => v.type === VehicleType.train)) {
        expect(veh).toBeInstanceOf(PublicVehicle);
        expect(veh).toBeInstanceOf(Train);
      }
    });
    it("equality of first train", async () => {
      expect(loadedTrain).toEqual(firstTrain);
    });
  });
});