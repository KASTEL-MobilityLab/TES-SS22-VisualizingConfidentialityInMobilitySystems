import type { Company } from "./Company";
import type { DataField } from "./DataField";

/**
 * The interface every vehicle must implement.
 */
export interface Vehicle extends DataField {
  readonly id: string;
  readonly companyId: string;
  company?: Company;
}
