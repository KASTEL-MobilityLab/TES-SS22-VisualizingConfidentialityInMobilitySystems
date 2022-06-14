import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Company } from "../dataFields/Company";
import { VehicleStatus, VehicleType } from "../dataFields/types";
import { User } from "../dataFields/User";
import { Vehicle } from "../dataFields/Vehicle";
import { EScooter } from "../dataFields/vehicles/EScooter";
import { IndividualVehicle } from "../dataFields/vehicles/IndividualVehicle";
import { PublicVehicle } from "../dataFields/vehicles/PublicVehicle";
import { Train } from "../dataFields/vehicles/Train";
import { DataLoader } from "../DataLoader";
import { DataManager } from "../DataManager";
import { DataPackage } from "../DataPackage";

describe.concurrent("DataLoader", async () => {
  const dataManager = new DataManager();
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
});
