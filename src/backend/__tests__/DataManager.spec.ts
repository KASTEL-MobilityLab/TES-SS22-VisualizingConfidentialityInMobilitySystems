import "reflect-metadata";
import { describe, expect, it } from "vitest";
import type { DataField } from "../dataFields";
import type { Id } from "../dataFields/types";
import { DataManager } from "../DataManager";
import { testDataLoaderParams } from "./DataLoader.spec";

// References start with an underscore
function compareReferences<T extends DataField>(
  actualReference: unknown,
  referenceId: Id,
  allLoadedDataFields: T[]
) {
  const expectedReference = allLoadedDataFields.find(
    (dataField) => dataField.id === referenceId
  );
  expect(expectedReference).toBeDefined();
  expect(actualReference).toStrictEqual(expectedReference);
}

describe.concurrent("DataManager", async () => {
  const dm = new DataManager(testDataLoaderParams);
  await dm.init();

  describe.concurrent("Check SetAllReferences", () => {
    it("Test References in Trip", () => {
      const trips = dm.trips;
      trips.forEach((trip) => {
        compareReferences(trip.vehicle, trip.vehicleId, dm.vehicles);
        compareReferences(trip.user, trip.userId, dm.users);
        compareReferences(trip.route, trip.routeId, dm.routes);
        compareReferences(trip.payment, trip.paymentId, dm.payments);
      });
    });

    it("Test References in Payment", () => {
      const payments = dm.payments;
      payments.forEach((payment) => {
        compareReferences(payment.trip, payment.tripId, dm.trips);
      });
    });

    it("Test References in Vehicle", () => {
      const vehicles = dm.vehicles;
      vehicles.forEach((vehicle) => {
        compareReferences(vehicle.company, vehicle.companyId, dm.companies);
      });
    });
  });
});
