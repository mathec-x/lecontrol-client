import { Moment } from "moment";
import { User, Product, Validation } from './models'
declare module 'react-redux' {
  export interface DefaultRootState {
    user: User,
    products: Product[],
    validations: Validation[],
  }

  export type Names = keyof DefaultRootState;

  export type State = DefaultRootState[Names];
  export type Action = {
    type: `${Names}:mount` | `${Names}:create` | `${Names}:update` | `${Names}:delete`,
    payload: State
  }
}

// all extensions methods(prototypes) must be declared here
declare global {
  interface String {
    moment(): Moment
  }
  interface Date {
    moment(): Moment
  }
  interface Object {
    update(obj: object): object;
  }
  interface Array<T> {
    update(obj: Array<T>): Array<T>;
  }
  interface Number {
    moment(): Moment
  }
}