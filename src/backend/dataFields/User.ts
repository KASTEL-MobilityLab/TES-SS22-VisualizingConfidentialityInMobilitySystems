class User implements DataField {
  //Initialize the UserID with the first letter of the ID
  id: string;
  forename: string;
  surname: string;
  phoneNumber: number;
  email: string;

  constructor(
    id: string,
    forename: string,
    surname: string,
    phonNumber: number,
    email: string
  ) {
    this.id = id;
    this.forename = forename;
    this.surname = surname;
    this.phoneNumber = phonNumber;
    this.email = email;
  }
}
