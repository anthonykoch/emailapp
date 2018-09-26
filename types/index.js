// @flow

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
  to?: string,
  href?: string,
  route?: string,
  icon: any,
}
