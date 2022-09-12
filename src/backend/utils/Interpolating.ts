import { LatLng } from "./LatLng";

// The distance between two waypoints in an interpolated waypoint array.
const stepSizeInMeter = 0.5;
// Distance between two lines of Latitude (does not depend on position).
const lineOfLatitudeDistanceInKM = 111.3;
// Distance between two lines of Longitude specifically at Karlsruhe
// latitude (around 49°) (111.3 * cos(latitude) = 73).
const lineOfLongitudeDistanceInKMInKarlsruhe = 73;
// Conversion factor for km to meter.
const kmInMeter = 1000;

/**
 * Interpolates a given array of waypoints by adding intermediate steps, so the
 * distance between each waypoints is about even.
 *
 * @param waypoints Array of Waypoints.
 * @returns An array of interpolated Waypoints.
 */
export function interpolate(waypoints: LatLng[]): LatLng[] {
  if (waypoints.length < 2) {
    return waypoints;
  }
  let interpolatedWaypoints: LatLng[] = [waypoints[0]];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const distance: number = distanceInMeterCalculate(
      waypoints[i],
      waypoints[i + 1]
    );
    const stepNumber = Math.round(distance / stepSizeInMeter);
    interpolatedWaypoints = interpolatedWaypoints.concat(
      calculateIntermediateSteps(waypoints[i], waypoints[i + 1], stepNumber)
    );
    interpolatedWaypoints.push(waypoints[i + 1]);
  }
  return interpolatedWaypoints;
}

/**
 * Creates an array of intermediate waypoints between to given waypoints with a
 * given number of required intermediate waypoints.
 *
 * @param firstWaypoint The first Waypoint.
 * @param secondWaypoint The second Waypoint.
 * @param stepNumber Number of required intermediate waypoints.
 * @returns An array with the intermediate waypoints between to Waypoints.
 */
function calculateIntermediateSteps(
  firstWaypoint: LatLng,
  secondWaypoint: LatLng,
  stepNumber: number
): LatLng[] {
  const intermediateSteps: LatLng[] = [];
  for (let i = 1; i < stepNumber; i++) {
    const nextStep: LatLng = new LatLng(
      (secondWaypoint.latitude - firstWaypoint.latitude) * (i / stepNumber) +
        firstWaypoint.latitude,
      (secondWaypoint.longitude - firstWaypoint.longitude) * (i / stepNumber) +
        firstWaypoint.longitude
    );
    intermediateSteps.push(nextStep);
  }
  return intermediateSteps;
}

/**
 * Calculates the distance in meter between two waypoints to a specific
 * lineOfLongitudeDistanceInKMInKarlsruhe value (73 in Karlsruhe).
 *
 * @param firstWaypoint The first Waypoint.
 * @param secondWaypoint The second Waypoint.
 * @returns The distance between the two waypoints in meter.
 */
function distanceInMeterCalculate(
  firstWaypoint: LatLng,
  secondWaypoint: LatLng
): number {
  const dx: number =
    lineOfLongitudeDistanceInKMInKarlsruhe *
    (firstWaypoint.longitude - secondWaypoint.longitude);
  const dy: number =
    lineOfLatitudeDistanceInKM *
    (firstWaypoint.latitude - secondWaypoint.latitude);
  return Math.sqrt(dx * dx + dy * dy) * kmInMeter;
}
