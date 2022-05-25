class Train implements PublicVehicle {
  id: string;
  type: ["e-scooter", "bike"];
  companyId: string;
  status: ["active", "inactive"];

  constructor(
    id: string,
    type: ["e-scooter", "bike"],
    companyId: string,
    status: ["active", "inactive"]
  ) {
    this.id = id;
    this.type = type;
    this.companyId = companyId;
    this.status = status;
  }
}
