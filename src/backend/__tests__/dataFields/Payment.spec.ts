import { PayPal } from "@/backend/dataFields/payments/Paypal";
import { Trip } from "@/backend/dataFields/Trip";
import { describe, expect, it } from "vitest";
import { payments, trips } from "../data/expectedData";

describe("Test Payment Subclasses", () => {
  const trip = trips[0];
  const payment = payments[0];

  it("try to retrieve undefined trip of payment", async () => {
    const payment = new PayPal("max.mustermann@gmail.com", "P02", "T04");
    expect(() => payment.trip).toThrowError();
  });

  it("assign invalid reference assignment", async () => {
    const invalidTrip = new Trip(
      "T10",
      "R10",
      "V10",
      "U10",
      "P11",
      24,
      20,
      new Date(),
      new Date()
    );
    expect(() => (payment.trip = invalidTrip)).toThrowError();

    // should not throw an error
    payment.trip = trip;
  });
});
