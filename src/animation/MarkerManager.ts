import { createMarker } from "@/utils/markerUtils";
import type { Vehicle } from "@/backend/dataFields";
import type { VehicleMarker } from "@/utils/leafletExtension";

export class MarkerManager {
  vehicleMarkerMap: Map<string, VehicleMarker>;

  constructor(allVehicles: Vehicle[]) {
    this.vehicleMarkerMap = new Map<string, VehicleMarker>();
    for (const vehicle of allVehicles) {
      this.vehicleMarkerMap.set(vehicle.id, createMarker(vehicle));
    }
  }

  updatePosition(vehicleId: string, allVehicles: Vehicle[]) {
    const vehicle = allVehicles.find((vehicle) => vehicle.id === vehicleId);
    const vehicleMarker = this.vehicleMarkerMap.get(vehicleId);
    if (vehicle?.currentPosition) {
      vehicleMarker?.setLatLng([
        vehicle.currentPosition.latitude,
        vehicle.currentPosition?.longitude,
      ]);
    }
  }
}
