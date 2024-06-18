export interface IRole {
  id: number
  name: string
}

export interface Params {
  id: string
  token: string | undefined
}

export interface Props {
  id: string
}

export interface IUser {
  id: number
  name: string
  email: string
  replacement_email: string | null
  entry_code: string
}

export interface IPermission {
  id: number
  user_id: number
  role_id: number
  role: IRole
}