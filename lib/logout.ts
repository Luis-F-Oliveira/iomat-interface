'use server'

import { api } from './axios'
import { cookies } from 'next/headers'

export async function logout() {
  const token = cookies().get('auth-token')?.value
  await api.post('logout', null, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  cookies().delete('auth-token')
  return true
}