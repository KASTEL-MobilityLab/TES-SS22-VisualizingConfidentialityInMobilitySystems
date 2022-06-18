import { User, CreditCard } from "@/backend/dataFields";
import { Company } from "@/backend/dataFields/Company";
import { PayPal } from "@/backend/dataFields/payments/Paypal";
import { Trip } from "@/backend/dataFields/Trip";
import { VehicleStatus } from "@/backend/dataFields/types";
import { EScooter } from "@/backend/dataFields/vehicles/EScooter";
import { Route } from "@/backend/dataFields/Route";
import { LatLng } from "@/backend/utils/LatLng";
import { describe, expect, it } from "vitest";

describe("Test Payment Subclasses", () => {
  const route = new Route(
    "R01",
    new LatLng(4.545454, 3.413242),
    new LatLng(10.43243, 3.321321)
  );
  const fireRunnerCompany = new Company("C01", "Fire Runner");
  const escooter = new EScooter(
    "V01",
    "C01",
    84,
    89,
    VehicleStatus.active,
    74,
    fireRunnerCompany
  );
  const user = new User(
    "U01",
    "Max",
    "Mustermann",
    49177574712378,
    "max.mustermann@gmail.com"
  );
  const tripToHerrenstreet = new Trip(
    "T01",
    "R01",
    "V01",
    "U01",
    "P01",
    24,
    "14:30",
    "15:30"
  );
  const payment = new PayPal(
    "max.mustermann@gmail.com",
    "P01",
    "T01",
    tripToHerrenstreet
  );

  it("try to retrieve undefined trip of payment", async () => {
    const payment = new PayPal("max.mustermann@gmail.com", "P02", "T04");
    expect(() => payment.trip).toThrowError();
  });

  it("assign invalid trip", async () => {
    const invalidTrip = new Trip(
      "T10",
      "R10",
      "V10",
      "U10",
      "P11",
      24,
      "4:30",
      "5:30"
    );
    expect(() => (payment.trip = invalidTrip)).toThrowError();

    // should not throw an error
    payment.trip = tripToHerrenstreet;
  });

  it("try to create a credit card payment with numbers instead of strings", async () => {
    const date: Date = new Date(Date.now());
    const payment1 = new CreditCard(
      32,
      344,
      date,
      "Master Card",
      "P0001",
      "T0001"
    );
    expect(payment1.cardNumber).toEqual(32);
  });
});
