import type { Company } from "../Company";
import type { Vehicle } from "../Vehicle";

/**
 * This interface has to be implemented by every publicly used vehicle like a train.
 */
export interface PublicVehicle extends Vehicle {
  readonly id: string;
  readonly companyId: string;
  company?: Company;
}
