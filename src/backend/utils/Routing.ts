import { isNode } from "browser-or-node";
import type { Route } from "../dataFields";
import { interpolate } from "./Interpolating";
import { LatLng } from "./LatLng";

/**
 * Fetch the Route for the given Route instance and profile (driving or cycling) from the Mapbox Directions API.
 *
 * @param route the route instance
 * @param profile driving or cycling
 * @returns a promise of an array of LatLng's
 */
export async function fetchWaypoints(
  route: Route,
  profile: "driving" | "cycling" = "driving"
): Promise<LatLng[]> {
  if (isNode) {
    throw new Error("Fetching from node environment currently not supported.");
  }
  if (!route.waypoints) {
    // request the waypoints for this route and set them in the route instance
    const waypoints = await fetchDirectionsAPI(route.start, route.end, profile);
    route.waypoints = waypoints;
    return interpolate(waypoints);
  }
  return interpolate(route.waypoints);
}

/**
 * Get the Route for the given start and end point and profile (driving or cycling).
 * Requests the Mapbox Directions API.
 *
 * @param start the start of the route
 * @param end the end of the route
 * @param profile whether the route is for cycling or driving
 * @returns a promise of an array of LatLng's
 */
async function fetchDirectionsAPI(
  start: LatLng,
  end: LatLng,
  profile: "cycling" | "driving" = "driving"
): Promise<LatLng[]> {
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/${profile}/${
      start.longitude
    },${start.latitude};${end.longitude},${
      end.latitude
    }?geometries=geojson&&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`,
    { method: "GET" }
  );
  const json = await query.json();
  const waypoints = json.routes[0].geometry.coordinates;
  // be careful: the API accepts and returns the waypoints in Longitude/Latitude order!
  return interpolate(
    waypoints.map(([lng, lat]: [number, number]) => new LatLng(lat, lng))
  );
}

export async function fetchGeocodingAPI(
  currentPosition: LatLng
): Promise<string> {
  const query = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${
      currentPosition.longitude
    },${currentPosition.latitude}.json?access_token=${
      import.meta.env.VITE_MAPBOX_API_KEY
    }`,
    { method: "GET" }
  );
  const json = await query.json();
  const address = json.features[0].text;
  return address;
}
