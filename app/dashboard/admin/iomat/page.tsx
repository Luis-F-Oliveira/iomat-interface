import { cookies } from "next/headers"
import { IData, columns } from "./columns"
import { DataTable } from "./data-table"
import { api } from "@/lib/axios"

async function getData(token: string | undefined): Promise<IData[]> {
  const response = await api.get('collecteddata', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response.data
}

export default async function Page() {
  const token = cookies().get('auth-token')?.value
  const data = await getData(token)

  return (
    <div className="container mx-auto mb-14">
      <DataTable token={token} columns={columns} data={data} />
    </div>
  )
}
