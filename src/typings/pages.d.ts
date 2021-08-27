import { FC } from 'react';
import { RouteComponentProps } from 'react-router';

export type Home = FC<RouteComponentProps>;
export type Menu = FC;

export type Register = FC<RouteComponentProps>;
export type RegisterEdit = FC<RouteComponentProps<{uuid: String}>>;

export type SignIn = FC<RouteComponentProps>;
export type SignInLogin = FC<RouteComponentProps>;
export type SignInRegister = FC<RouteComponentProps>;
