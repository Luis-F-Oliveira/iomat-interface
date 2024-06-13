import { api } from '@/lib/axios';
import { cookies } from 'next/headers';
import { AdminNavbarUi } from './admin-navbar-ui';

async function getData(): Promise<string[]> {
  const token = cookies().get('auth-token')?.value
  const response = await api.get('permissions', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function AdminNavbar() {
  const data = await getData()
  
  return <AdminNavbarUi data={data} />
}