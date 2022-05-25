class EScooter implements IndividualVehicle {
  id: string;
  type: ["e-scooter", "bike"];
  companyId: string;
  condition: number;
  batteryCondition: number;
  status: ["active", "inactive"];
  batteryLevel: number;

  constructor(
    id: string,
    type: ["e-scooter", "bike"],
    companyId: string,
    condition: number,
    batteryCondition: number,
    status: ["active", "inactive"],
    batteryLevel: number
  ) {
    this.id = id;
    this.type = type;
    this.companyId = companyId;
    this.condition = condition;
    this.batteryCondition = batteryCondition;
    this.status = status;
    this.batteryLevel = batteryLevel;
  }
}
