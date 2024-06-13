import { RolesProvider } from '@/context/roles';
import { api } from '@/lib/axios';
import { cookies } from 'next/headers';
import { Forms } from './forms';
import { Badges } from './badge';
import { SaveButton } from './save';

export type IRoles = {
  id: number
  name: string
}

interface RolesProps {
  token: string
}

async function getData(): Promise<IRoles[]> {
  const token = cookies().get('auth-token')?.value
  const response = await api.get('roles', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export default async function Roles({ token }: RolesProps) {
  const data = await getData()

  return (
    <RolesProvider>
      <section className='space-y-3'>
        <h1 className='text-2xl mb-5'>
          Adicionar Permissões
        </h1>
        <Forms roles={data} />
        <Badges />
        <SaveButton token={token} />
      </section>
    </RolesProvider>
  )
}