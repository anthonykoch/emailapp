// @flow

import type {
  $Request,
  $Response,
} from 'express'

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


export type NextInitialArg = {
  req: $Request,
  res: $Response,
  isServer: boolean,
}
