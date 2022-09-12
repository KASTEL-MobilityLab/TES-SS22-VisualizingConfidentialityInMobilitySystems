import { DataManager } from "@/backend/DataManager";
import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { DataModule } from "../dataModules/DataModule";
import { testDataLoaderParams } from "./DataLoader.spec";

describe("TestRisks", async () => {
  const dm = new DataManager(testDataLoaderParams);
  await dm.init();
  const users = dm.users;
  const loadedUser = users[0];
  const dataModule = new DataModule(loadedUser, dm.riskManager);

  it("Check whether there is the same risk defined in the DataModule", () => {
    expect(dataModule).toBeInstanceOf(DataModule);
  });
});
