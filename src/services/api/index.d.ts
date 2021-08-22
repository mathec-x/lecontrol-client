export const Host = process.env.REACT_APP_API_URL;
export const SocketApiUrl = process.env.REACT_APP_SOCKET_URL;

type RequestMethods = "GET"|"POST"|"PUT"|"DELETE";
export const Request : (method: RequestMethods, uri:String, body: {}, headers: {} ) => Promise<Response>;

type Auth = {
  login(data: { mail:String, password:String }) : Promise<Response>;
  register(data: { mail:String, password:String, name:String, company:String}) : Promise<Response>;
  refresh() : Promise<Response>;
}

export const Auth : Auth;

type Product = {
  get() : Promise<Response>;
  add(data: { label:String }) : Promise<Response>;
  set(data: { uuid:String, label:String }) : Promise<Response>;
  del(data: { uuid:String}) : Promise<Response>;
  addValidation( uuid:String, data: { expiration: Date }) : Promise<Response>;
}

export const Product : Product

type Validation = {
  set(data: { uuid:String, expiration: Date }) : Promise<Response>;
  del(data: { uuid:String }) : Promise<Response>;
}

export const Validation: Validation
