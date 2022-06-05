import { Company } from "@/backend/dataFields/Company";
import { VehicleStatus } from "@/backend/dataFields/types";
import { EScooter } from "@/backend/dataFields/vehicles/EScooter";
import { Train } from "@/backend/dataFields/vehicles/Train";
import { describe, expect, it } from "vitest";

describe("Test Vehicle Subclasses", () => {
  const fireRunnerCompany = new Company("C01", "Fire Runner");
  const escooter = new EScooter(
    "V01",
    fireRunnerCompany.id,
    84,
    89,
    VehicleStatus.active,
    74,
    fireRunnerCompany
  );

  it("try to retrieve undefined company of vehicle", () => {
    const train = new Train("V01", "C01");
    expect(() => train.company).toThrowError();
  });

  it("assign invalid company", () => {
    const invalidCompany = new Company("C10", "Foo");
    expect(() => (escooter.company = invalidCompany)).toThrowError();

    // should not throw an error
    escooter.company = fireRunnerCompany;
  });
});
