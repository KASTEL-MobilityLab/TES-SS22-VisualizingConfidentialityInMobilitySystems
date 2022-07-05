import { LatLng as CustomLatLng } from "@/backend/utils/LatLng";
import { LatLng as LeafletLatLng } from "leaflet";

/**
 * Converts a CustomLatLng to a LeafletLatLng.
 *
 * @param latLng Custom LatLng to convert to Leaflet LatLng
 * @returns a LeafletLatLng
 */
export function toLeafletLatLng(latLng: CustomLatLng): LeafletLatLng {
  return new LeafletLatLng(latLng.latitude, latLng.longitude);
}

/**
 * Converts a LeafletLatLng to a CustomLatLng.
 *
 * @param latLng LeafletLatLng to convert to CustomLatLng (our LatLng Class)
 * @returns a {@link CustomLatLng}
 */
export function fromLeafletLatLng(latLng: LeafletLatLng): CustomLatLng {
  return new CustomLatLng(latLng.lat, latLng.lng);
}
