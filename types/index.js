// @flow

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  role: string,
}

export type SidebarLink = {
  id: number,
  children: any,
  to: {},
  icon: any,
}
