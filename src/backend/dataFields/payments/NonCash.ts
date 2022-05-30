import type { Payment } from "../Payment";
import type { PaymentType } from "../types";

/**
 * The NonCash Interface.
 */
export interface NonCash extends Payment {
  readonly provider: string;
  readonly paymentType: PaymentType;
}
