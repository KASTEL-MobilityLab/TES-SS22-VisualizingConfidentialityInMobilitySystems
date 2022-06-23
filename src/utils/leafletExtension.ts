import type { Layer, Marker } from "leaflet";

// Note: Those interface are necessary to stop the compiler from complaining about the type of the marker.
// and the layer. The other option is to cast the marker to any, which is ugly as well.

/**
 * Extend the LayerEvent to be able to access the vehicle id of the markers on this layer.
 */
export interface VehicleLayer extends Layer {
  vehicleId: string;
}

/**
 * Extends L.Marker to add a vehicleId to the marker.
 *
 */
export interface VehicleMarker extends Marker {
  // TODO: we could also add the vehicle object directly here?
  vehicleId: string;
}
