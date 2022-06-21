import "reflect-metadata";
import { describe, expect, it } from "vitest";
import type { DataField } from "../dataFields";
import { AvailableData, DataLoader, getData } from "../DataLoader";
import { RiskDefinition } from "../riskManager/RiskDefinition";
import * as expectedData from "./data/expectedData";

describe.concurrent("Async get Data", async () => {
  it("valid data path", async () => {
    const companies = await getData(AvailableData.companies);
    expect(companies[0]).toMatchObject({
      id: "C01",
      name: "Fire Runner",
    });
  });
});

// utility function to compare two arrays of dataFields
function compareDataFields<T extends DataField>(
  actualDataFields: T[],
  expectedDataFields: T[],
  verbose = false
) {
  if (actualDataFields.length !== expectedDataFields.length) {
    throw new Error(
      "Length of loaded data does not match length of expected data. Is the test data correctly set up?"
    );
  }
  actualDataFields.forEach((actual, index) => {
    const expected: T = expectedDataFields[index];
    if (verbose) {
      console.log(`Actual DataField at index ${index}`);
      console.table(actual);
      console.log(`Expected DataField at index ${index}`);
      console.table(expected);
    }
    // check that all properties exist
    Object.getOwnPropertyNames(expected).forEach((property) => {
      expect(actual).toHaveProperty(property);
    });
    expect(actual).toBeInstanceOf(expected.constructor);
    expect(actual).toStrictEqual(expected);
  });
}

describe.concurrent("DataLoader", () => {
  const dl = new DataLoader({
    companyPath: AvailableData.testCompanies,
    userPath: AvailableData.testUsers,
    vehiclePath: AvailableData.testVehicles,
    routePath: AvailableData.testRoutes,
    tripPath: AvailableData.testTrips,
    riskPath: AvailableData.testRisks,
    paymentPath: AvailableData.testPayments,
  });

  it("load all companies", async () => {
    const companies = await dl.loadAllCompanies();
    const expectedCompanies = expectedData.companies;
    compareDataFields(companies, expectedCompanies);
  });

  it("load all users", async () => {
    const users = await dl.loadAllUsers();
    const expectedUsers = expectedData.users;
    compareDataFields(users, expectedUsers);
  });

  it("load all Vehicles", async () => {
    const vehicles = await dl.loadAllVehicles();
    const expectedVehicles = expectedData.vehicles;
    compareDataFields(vehicles, expectedVehicles);
  });

  it("load all payments", async () => {
    const payments = await dl.loadAllPayments();
    const expectedPayments = expectedData.payments;
    compareDataFields(payments, expectedPayments);
  });

  it("load all risks", async () => {
    const risks = await dl.loadAllRisks();
    const expectedRisks = expectedData.risks;
    for (const index in risks) {
      expect(risks[index]).toBeInstanceOf(RiskDefinition);
      expect(risks[index]).toEqual(expectedRisks[index]);
    }
  });
});
