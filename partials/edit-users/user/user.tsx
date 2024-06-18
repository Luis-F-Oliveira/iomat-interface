import React from 'react'
import { Params, Props } from '../@types/types'
import { IUser } from '@/app/dashboard/admin/users/columns'
import { api } from '@/lib/axios'
import { cookies } from 'next/headers'
import { Forms } from './forms'

async function getData(params: Params): Promise<IUser> {
  const response = await api.get(`users/${params.id}`, {
    headers: {
      'Authorization': `Bearer ${params.token}`
    }
  })
  
  const { data } = response
  return data
}

export const User: React.FC<Props> = async ({ id }) => {
  const token = cookies().get('auth-token')?.value
  const data = await getData({ id, token })

  return <Forms data={data} token={token} />
}
