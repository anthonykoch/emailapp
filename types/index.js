// @flow

import type {
  $Request,
  $Response,
} from 'express'

import type Knex from 'knex'

import { type Service as MessagesService } from '@server/services/messages/messages.class'

export type KnexDB = Knex<any>

export type UserFrom = {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
}

export type MessageTag = {
  name: string,
}

export type Message = {
  id: number,
  from: UserFrom,
  tags: MessageTag[],
  message: string,
  read: boolean,
}

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  role: string,
  shortName: string,
}

export type SidebarLink = {
  id: number,
  children: any,
  href?: string,
  route?: string,
  icon: any,
}

export type OverviewItem = {
  icon: any,
  title: any,
  amount: any,
  timeframe: any,
}

export type VoteOptionResult = {
  id: number,
  title: string,
  votes: number,
}

export interface IMeetingStore {
  isSidebarShowing: boolean;
  showSidebar(): void;
  hideSidebar(): void;
}

export interface IRootStore {
  meeting: IMeetingStore;
  isServer: boolean;
  lastUpdate: number;
  constructor(isServer: boolean, lastUpdate: number): void;
}

export type Services = {
  messages: MessagesService,
}

export type NextInitialArgs = {
  req?: $Request,
  res?: $Response,
  isServer?: boolean,
  services: Services,
}

export interface IModel {
  fillable: string[];
  table: string;
  data: {};
}

export interface IDBService {
  db: KnexDB;

  constructor({ db: KnexDB }): void;
}

export interface IStatusService {
  // TODO
}


export type GetResponse = {
  data: {} | null
}

export type FindResponse = {
  data: *[],
}

export type CreateResponse = {
  data: {}[],
}

export type SingleCreateResponse = {
  data: {},
}

export type ErrorResponse = {
  status: number,
  message: string,
}

export type DataResponse = {
  status: number,
  data: mixed,
}

export type ValidationResponse = {
  status: number,
  invalid: {
    errors: [],
  },
}

export type Response = DataResponse | ErrorResponse | ValidationResponse

export type ValidationResult = {
  errors: {},
  count: number,
  isValid: boolean,
}

export interface IValidator {
  rules: Object;
  messages: Object;
  constructor(): void;
  pick(context: any): {};
  check({
    context: any,
  } & ValidationResult): void | any;
}
