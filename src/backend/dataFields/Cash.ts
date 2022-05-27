class Cash implements Payment {
  id: string;
  tripId: string;

  constructor(id: string, tripId: string) {
    this.id = id;
    this.tripId = tripId;
  }
}
