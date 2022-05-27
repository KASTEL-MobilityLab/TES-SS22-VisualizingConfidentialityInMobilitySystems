class CreditCard implements NonCash {
  id: string;
  tripId: string;
  provider: string;
  cardNumber: number;
  ccv: number;
  expiryDate: Date;

  constructor(
    id: string,
    tripId: string,
    provider: string,
    cardNumber: number,
    ccv: number,
    expiryDate: Date
  ) {
    this.id = id;
    this.tripId = tripId;
    this.provider = provider;
    this.cardNumber = cardNumber;
    this.ccv = ccv;
    this.expiryDate = expiryDate;
  }
}
