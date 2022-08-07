import type { Vehicle } from "@/backend/dataFields";
import type { VehicleMarker } from "@/utils/leafletExtension";
import { toLeafletLatLng } from "@/utils/latLngUtils";
import { generateAllVehicleMarkers } from "@/utils/markerUtils";

export class MarkerManager {
  allMarkers: VehicleMarker[] = [];
  vehicleMarkerMap: Map<string, VehicleMarker> = new Map();

  updatePosition(marker: L.Marker, vehicleId: string, allVehicles: Vehicle[]) {
    const vehicle = allVehicles.find((vehicle) => vehicle.id === vehicleId);
    if (vehicle?.currentPosition) {
      const leafletWaypoints = toLeafletLatLng(vehicle?.currentPosition);
      marker.setLatLng([leafletWaypoints.lat, leafletWaypoints.lng]);
    }
  }

  init(allVehicles: Vehicle[]) {
    this.allMarkers = generateAllVehicleMarkers(allVehicles);
    this.vehicleMarkerMap = new Map<string, VehicleMarker>();
    for (let i = 0; i < this.allMarkers.length; i++) {
      this.vehicleMarkerMap.set(allVehicles[i].id, this.allMarkers[i]);
    }
  }
}
