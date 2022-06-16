import type { Role } from "./roles";

export class RiskManager {
  getExplanation(dataType: string, role: Role): string {
    return "MISSING IMPLEMEENTATION";
  }

  getVisibility(dataType: string, role: Role): boolean {
    return true;
  }
}
