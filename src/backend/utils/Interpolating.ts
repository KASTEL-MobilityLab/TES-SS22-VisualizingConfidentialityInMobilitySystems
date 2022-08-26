import { LatLng } from "./LatLng";

const stepSizeInMeter = 0.2;

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
    const distance: number = distanceCalculate(waypoints[i], waypoints[i + 1]);
    const stepNumber = Math.round(distance / stepSizeInMeter);
    interpolatedWaypoints = interpolatedWaypoints.concat(
      calculateIntermediateSteps(waypoints[i], waypoints[i + 1], stepNumber)
    );
    interpolatedWaypoints.push(waypoints[i + 1]);
  }
  return interpolatedWaypoints;
}

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

function distanceCalculate(
  firstWaypoint: LatLng,
  secondWaypoint: LatLng
): number {
  const dx: number = 73 * (firstWaypoint.longitude - secondWaypoint.longitude);
  const dy: number = 111.3 * (firstWaypoint.latitude - secondWaypoint.latitude);
  return Math.sqrt(dx * dx + dy * dy) * 1000;
}
