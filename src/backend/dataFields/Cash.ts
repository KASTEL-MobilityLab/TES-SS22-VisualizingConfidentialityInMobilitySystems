class Cash implements Payment {
  id: string;
  tripId: string;
  type: ["Credit Card", "Cash"];

  constructor(id: string, tripId: string, type: ["Credit Card", "Cash"]) {
    this.id = id;
    this.tripId = tripId;
    this.type = type;
  }
}
