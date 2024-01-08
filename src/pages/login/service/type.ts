export interface LoginAccount {
  username: string
  password: string
}
type IdType = number | string

export interface MenuItemRes {
  id: IdType
  parentId?: IdType | null
  permission?: string
  type?: number
  icon?: string | null
  url: string | null
  menuName: string
  sort?: number
  menuType?: number
  isLink?: 0 | 1
  link?: string
  isIframe?: 0 | 1
  createAt?: string
  updateAt?: string
  redirectUrl?: string
  children?: MenuItemRes[] | null
}
