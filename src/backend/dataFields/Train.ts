class Train implements PublicVehicle {
  id: string;
  companyId: string;

  constructor(id: string, companyId: string) {
    this.id = id;
    this.companyId = companyId;
  }
}
