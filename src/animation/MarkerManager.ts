import { createMarker } from "@/utils/markerUtils";
import type { Vehicle } from "@/backend/dataFields";
import type { VehicleMarker } from "@/utils/leafletExtension";
import { toLeafletLatLng } from "@/utils/latLngUtils";

export class MarkerManager {
  vehicleMarkerMap: Map<string, VehicleMarker>;

  constructor(allVehicles: Vehicle[]) {
    this.vehicleMarkerMap = new Map<string, VehicleMarker>();
    for (const vehicle of allVehicles) {
      this.vehicleMarkerMap.set(vehicle.id, createMarker(vehicle));
    }
  }

  updatePosition(marker: L.Marker, vehicleId: string, allVehicles: Vehicle[]) {
    const vehicle = allVehicles.find((vehicle) => vehicle.id === vehicleId);
    const vehicleMarker = this.vehicleMarkerMap.get(vehicleId);
    if (vehicle?.currentPosition) {
      const leafletWaypoints = toLeafletLatLng(vehicle?.currentPosition);
      //vehicleMarker?.setLatLng([leafletWaypoints.lat, leafletWaypoints.lng]);
      marker.setLatLng([leafletWaypoints.lat, leafletWaypoints.lng]);
    }
  }
}
