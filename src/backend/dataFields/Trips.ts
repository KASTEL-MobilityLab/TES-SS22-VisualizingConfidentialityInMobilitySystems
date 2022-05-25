class Trips implements DataField {
  id: string;
  routeId: string;
  vehicleId: string;
  userId: string;
  paymentId: string;
  price: number;
  startTime: string;
  endTime: string;

  constructor(
    id: string,
    routeId: string,
    vehicleId: string,
    userId: string,
    paymentId: string,
    price: number,
    startTime: string,
    endTime: string
  ) {
    this.id = id;
    this.routeId = routeId;
    this.vehicleId = vehicleId;
    this.userId = userId;
    this.paymentId = paymentId;
    this.price = price;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
