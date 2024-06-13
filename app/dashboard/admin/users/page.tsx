import { api } from '@/lib/axios'
import { columns, IUser } from './columns'
import { cookies } from 'next/headers'
import { DataTable } from './data-table'
import { Suspense } from 'react'
import { BlocksLoading } from '@/components/loading/blocks'

const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
      <BlocksLoading />
    </div>
  )
}

async function getData(): Promise<IUser[]> {
  const token = cookies().get('auth-token')?.value
  const response = await api.get('users', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export default async function Page() {
  const data = await getData()
  return (
    <Suspense fallback={<Loading />}>
      <DataTable columns={columns} data={data} />
    </Suspense>
  )
}