import type { Vehicle } from "@/backend/dataFields";
import type { VehicleMarker } from "@/utils/leafletExtension";
import { toLeafletLatLng } from "@/utils/latLngUtils";
import { generateAllVehicleMarkers } from "@/utils/markerUtils";

/**
 * The MarkerManager manages the markers that are placed on the map. Manage in
 * this context means that they are stored here and updated in relation to
 * their position.
 */
export class MarkerManager {
  allMarkers: VehicleMarker[] = [];
  vehicleMarkerMap: Map<string, VehicleMarker> = new Map();

  /**
   * Updates the position of the marker to the current position of the
   * corresponding vehicle.
   * @param marker the marker to be placed at a new position
   * @param vehicleId the VehicleId of the vehicle that corresponds to the marker
   * @param allVehicles all existing vehicles
   */
  updatePosition(marker: L.Marker, vehicleId: string, allVehicles: Vehicle[]) {
    const vehicle = allVehicles.find((vehicle) => vehicle.id === vehicleId);
    if (vehicle?.currentPosition) {
      const leafletWaypoints = toLeafletLatLng(vehicle?.currentPosition);
      marker.setLatLng([leafletWaypoints.lat, leafletWaypoints.lng]);
    }
  }

  /**
   * Initializes the vehicleMarkerMap, which maps the vehicleId to the markers.
   * @param allVehicles all existing vehicles
   */
  init(allVehicles: Vehicle[]) {
    this.allMarkers = generateAllVehicleMarkers(allVehicles);
    this.vehicleMarkerMap = new Map<string, VehicleMarker>();
    for (let i = 0; i < this.allMarkers.length; i++) {
      this.vehicleMarkerMap.set(allVehicles[i].id, this.allMarkers[i]);
    }
  }
}
