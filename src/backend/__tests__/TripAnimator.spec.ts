import { describe, expect, it } from "vitest";
import { DataManager } from "../DataManager";
import type { LatLng } from "../utils/LatLng";
import { testDataLoaderParams } from "./DataLoader.spec";

describe("Test Trip Animator", async () => {
  const dm = new DataManager(testDataLoaderParams);
  await dm.init(false);
  // the trip and vehicle to check the animation against
  const trip = dm.trips[0];
  const vehicle = dm.vehicles[0];
  let waypoints: LatLng[];
  it("Pre StartAnimation test", () => {
    // sanity checks
    expect(vehicle.currentPosition).toBeDefined();
    expect(trip.route).toBeDefined();
    expect(trip.route?.waypoints).toBeDefined();
    waypoints = trip.route?.waypoints as LatLng[];

    expect(vehicle.currentPosition).toEqual(waypoints[0]);
  });
  it("Test Trip Step function", () => {
    expect(trip.currentStep).toBe(0);
    trip.step();
    expect(trip.currentStep).toBe(1);
    expect(vehicle.currentPosition).toEqual(waypoints[1]);
    trip.step();
    expect(trip.currentStep).toBe(2);
    expect(vehicle.currentPosition).toEqual(waypoints[2]);
    expect(trip.isFinished()).toBeTruthy();
  });
  it("Test Trip Reset Step Counter function", () => {
    trip.resetStepCounter();
    expect(trip.currentStep).toBe(0);
  });
});

it("Test Start Animation", async () => {
  const dm = new DataManager(testDataLoaderParams);
  await dm.init(false);
  const trip = dm.trips[0];
  expect(trip.currentStep).toBe(0);
  dm.startAnimation();
  while (!trip.isFinished()) {
    await new Promise((r) => setTimeout(r, 100));
  }
  dm.stopAnimation();
  expect(dm.tripAnimator?.isRunning).toBeFalsy();
  expect(trip.currentStep).toBeGreaterThan(0);
  expect(trip.isFinished()).toBeTruthy();
  expect(trip.vehicle?.currentPosition).toStrictEqual(trip.route?.end);
});
