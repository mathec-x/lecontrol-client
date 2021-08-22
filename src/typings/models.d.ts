export type User = {
  uuid: String;
  name: String;
  login: String;
  token: String;
  company: {
    id: Number;
    name: String
  }
}
export type Product = {
  id: Number;
  uuid: String;
  label: String;
}
export type Validation = {
  uuid: String;
  productId: Number;
  expiration: Date;
}