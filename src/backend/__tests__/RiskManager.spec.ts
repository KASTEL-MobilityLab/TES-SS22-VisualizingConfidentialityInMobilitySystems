import { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { DataLoader } from "../DataLoader";
import { DataType } from "../dataType";
import { RiskDefinition } from "../riskManager/RiskDefinition";
import { RiskLevel } from "../riskManager/RiskLevel";
import { Role } from "../roles";

describe.concurrent("TestRisks", async () => {
  const dl = new DataLoader({
    /**
         * TODO: Insert Test Data here
         
          companyPath: AvailableData.testCompanies,
          userPath: AvailableData.testUsers,
          vehiclePath: AvailableData.testVehicles,
          routePath: AvailableData.testRoutes,
          tripPath: AvailableData.testTrips,
          riskPath: AvailableData.testRisks,
          paymentPath: AvailableData.testPayments,
    
          */
  });
  const dm = new DataManager();
  dm.init();
  const risks = await dl.loadAllRisks();
  const loadedRisk = risks[11];
  const expectedRisk = new RiskDefinition(DataType.Forename, RiskLevel.low, [
    Role.company,
    Role.user,
  ]);
  const users = dm.users;
  const loadedUser = users[0];
  const dataModule = new DataModule(loadedUser, dm.riskManager);

  it("Eleventh Risk check", () => {
    expect(loadedRisk).toBeInstanceOf(RiskDefinition);
    expect(loadedRisk).toEqual(expectedRisk);
  });
  it("Check whether there is the same risk defined in the DataModule", () => {
    expect(dataModule).toBeInstanceOf(DataModule);
    expect(dataModule.risks["forename"]).toEqual(expectedRisk);
  });
});
