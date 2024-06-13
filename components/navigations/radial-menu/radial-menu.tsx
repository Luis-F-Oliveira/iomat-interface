import { api } from '@/lib/axios';
import { RadialMenuUi } from './radial-menu-ui';
import { cookies } from 'next/headers';

async function getData(): Promise<string[]> {
  const token = cookies().get('auth-token')?.value
  const response = await api.get('permissions', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function RadialMenu() {
  const data = await getData()
  
  return <RadialMenuUi data={data} />
}