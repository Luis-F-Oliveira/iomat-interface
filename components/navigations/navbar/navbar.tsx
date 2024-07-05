import { api } from '@/lib/axios'
import { cookies } from 'next/headers'
import { NavbarUi } from './navbar-ui'

export interface INavigation {
  id: number
  name: string
  href: string
  route: string
  parent_id: number | null
  replies: INavigation[]
}

export interface IRoles {
  id: number
  navigation_id: number
  role_id: number
  role: IRole
}

interface IRole {
  id: number
  name: string
}

async function getNavigation(token: string | undefined): Promise<INavigation[]> {
  const response = await api.get('navigations', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

async function getRoles(token: string | undefined): Promise<IRoles[]> {
  const response = await api.get('roles_on_navigations', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

async function getPermissions(token: string | undefined): Promise<string[]> {
  const response = await api.get('permissions', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export const Navbar = async () => {
  const token = cookies().get('auth-token')?.value
  
  const navigations = await getNavigation(token)
  const permissions = await getPermissions(token)
  const roles = await getRoles(token)

  return <NavbarUi 
    navigations={navigations} 
    permissions={permissions}
    roles={roles}
  />
}