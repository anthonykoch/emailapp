// @flow

import type {
  $Request,
  $Response,
} from 'express'

import type Knex from 'knex'

import { type RootStore } from '@app/store'
import { type Service as UsersMessagesOverviewService } from '@server/services/users/messages-overview.service'
import { type Service as UsersMessagesService } from '@server/services/users/messages.service'
import { type Service as UsersService } from '@server/services/users/users.service'

export type IRootStore = RootStore

export type KnexDB = Knex<any>

export type Overview = {
  sent: number,
  received: number,
}

export type UserFrom = {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  shortname: string,
}

export type MessageTag = {
  name: string,
}

export type Message = {
  id: number,
  from: UserFrom,
  tags: MessageTag[],
  subject: string,
  message: string,
  read: boolean,
}

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  profileImage: string,
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

export type Services = {
  usersMessagesOverview: UsersMessagesOverviewService,
  usersMessages: UsersMessagesService,
  users: UsersService,
}

export type NextInitialArgs = {
  req: $Request & { user: { id: number | string } },
  res: $Response,
  store: IRootStore,
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
  errors: Object,
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






export type AuthStoreState = {
  isLoggedIn: boolean,
  token: null | string,
  isFetching: boolean,
}

export type UsersStoreState = {
  user: ?User,
}

export type MeetingStoreState = {
  isSidebarShowing: boolean,
}

export type UsersMessagesStoreState = {
  messages: Message[],
}

export type UsersMessagesOverviewStoreState = {
  overview: Overview,
}

export type RootStoreState = {
  isServer: boolean,
  auth?: AuthStoreState,
  meeting?: MeetingStoreState,
  users?: UsersStoreState,
  usersMessages?: UsersMessagesStoreState,
  usersMessagesOverview?: UsersMessagesOverviewStoreState,
}
