import type { CustomCommands, Spec } from "immutability-helper";
import type { Moment } from "moment";
import { User, Product, Validation } from './models'

  declare module 'react-redux' {
  export interface DefaultRootState {
    user: User,
    products: Product[],
    validations: Validation[],
  }

  // export type Names = keyof DefaultRootState;

  // export type State = DefaultRootState[Names];
  // export type Action = {
  //   type: `${Names}:mount` | `${Names}:create` | `${Names}:update` | `${Names}:delete`,
  //   payload: State
  // }
}

// all extensions methods(prototypes) must be declared here
declare global {
  interface String {
    moment(): Moment
  }
  interface Date {
    moment(): Moment
  }
  interface Number {
    moment(): Moment
  }
  interface Object {
    update: <E = Object, C extends CustomCommands<object> = never>(object: E, $spec: Spec<E, C>) => E
  }
  interface Array<T> {
      update: <E = T, C extends CustomCommands<object> = never>(object: E, $spec: Spec<E, C>) => E
  }
}