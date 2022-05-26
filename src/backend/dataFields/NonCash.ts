interface NonCash extends Payment {
  provider: string;
  cardNumber: number;
  ccv: number;
  expiryDate: Date;
}
