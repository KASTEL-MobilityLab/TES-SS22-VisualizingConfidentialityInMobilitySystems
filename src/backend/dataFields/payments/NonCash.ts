import { Payment } from "../Payment";

/**
 * This abstract class must be extended by any non-cash payment such as credit cards.
 */
export abstract class NonCash extends Payment {}
