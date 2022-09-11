import type { Vehicle } from "@/backend/dataFields";
import { toLeafletLatLng } from "@/utils/latLngUtils";
import type { VehicleMarker } from "@/utils/leafletExtension";
import { generateAllVehicleMarkers } from "@/utils/markerUtils";

/**
 * The MarkerManager manages the markers that are placed on the map. Manage in
 * this context means that they are stored here and updated in relation to
 * their position.
 */
export class MarkerManager {
  allMarkers: VehicleMarker[] = [];
  vehicleMarkerMap: Map<string, VehicleMarker> = new Map();
  currentMarker?: VehicleMarker;

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

  /**
   * Highlights the given marker by adding a class to the icon.
   *
   * @param marker the marker to highlight
   */
  highlightCurrentMarker(marker: VehicleMarker) {
    this.currentMarker = marker;

    // add class 'selected-marker' to current marker
    const icon = marker.getIcon() as L.DivIcon;
    icon.options.className = icon.options.className + " selected-marker";
    this.currentMarker.setIcon(icon); // to update the icon class in DOM
  }

  /**
   * Deselects the current marker and removes the highlight
   */
  deselectMarker() {
    const marker = this.currentMarker;
    if (marker) {
      const icon = marker.getIcon() as L.DivIcon;
      icon.options.className = icon.options.className?.split(" ")[0];
      marker.setIcon(icon); // to update the icon class in DOM
    }
    this.currentMarker = undefined;
  }
}
