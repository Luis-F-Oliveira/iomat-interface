import { IData } from '@/context/scrapping'
import { api } from '@/lib/axios'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const token = cookies().get('auth-token')?.value
    const infos: IData = await req.json()

    const response = await api.post('collecteddata', infos, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const { data } = response

    return Response.json({ data })
  } catch (error) {
    return Response.json({ error: error })
  }
}