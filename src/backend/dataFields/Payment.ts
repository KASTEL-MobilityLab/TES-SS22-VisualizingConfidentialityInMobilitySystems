interface Payment extends DataField {
  id: string;
  tripId: string;
  type: ["Credit Card", "Cash"];
}
