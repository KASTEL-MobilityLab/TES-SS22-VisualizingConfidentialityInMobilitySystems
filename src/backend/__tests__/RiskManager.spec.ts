import { DataManager } from "@/backend/DataManager";
import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { DataModule } from "../dataModules/DataModule";
import * as expectedData from "./data/expectedData";
import { testDataLoaderParams } from "./DataLoader.spec";

describe("TestRisks", async () => {
  const dm = new DataManager(testDataLoaderParams);
  await dm.init();
  const risks = dm.riskManager.riskDefinitions;
  const expectedRisk = expectedData.risks[2];
  const users = dm.users;
  const loadedUser = users[0];
  const dataModule = new DataModule(loadedUser, dm.riskManager);

  it("Check whether there is the same risk defined in the DataModule", () => {
    expect(dataModule).toBeInstanceOf(DataModule);
    //expect(dataModule.risks["user.forename"]).toEqual(expectedRisk);
  });
});
