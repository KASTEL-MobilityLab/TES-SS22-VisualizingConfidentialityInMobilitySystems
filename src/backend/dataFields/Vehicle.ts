import type { Company } from "./Company";
import type { DataField } from "./DataField";
import type { VehicleType } from "./types";

/**
 * The interface every vehicle must implement.
 */
export interface Vehicle extends DataField {
  readonly id: string;
  readonly companyId: string;
  readonly type: VehicleType;
  company?: Company;
}
