import React from 'react'
import { IPermission, IRole, Params, Props } from '../@types/types'
import { cookies } from 'next/headers'
import { api } from '@/lib/axios'
import { Forms } from './forms'
import { Badges } from './badge'
import { SaveButton } from './save'

async function getRoles(token: string | undefined): Promise<IRole[]> {
  const response = await api.get(`roles`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  
  const { data } = response
  return data
}

async function getData(params: Params): Promise<IPermission[]> {
  const response = await api.get(`permissions/${params.id}`, {
    headers: {
      'Authorization': `Bearer ${params.token}`
    }
  })
  
  const { data } = response
  return data
}

export const Permission: React.FC<Props> = async ({ id }) => {
  const token = cookies().get('auth-token')?.value
  const data = await getData({ id, token })
  const roles = await getRoles(token)
  
  return (
    <div className='space-y-2'>
      <Forms data={roles} />
      <Badges data={data} />
      <SaveButton id={id} token={token} />
    </div>
  )
}
