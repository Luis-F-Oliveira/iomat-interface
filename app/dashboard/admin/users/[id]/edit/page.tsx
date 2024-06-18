import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RolesProvider } from "@/context/roles"
import { Permission, User } from "@/partials/edit-users"
import { Info, Trash } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  return (
    <div className="min-h-container flex flex-col justify-center items-center">
      <Card className="w-1/2">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Editar</CardTitle>
            <CardDescription>
              Adicionar descrição futuramente
            </CardDescription>
          </div>
          <Button variant='ghost'>
            <Trash />
          </Button>
        </CardHeader>
        <CardContent>
          <CardTitle>Dados do Usuário</CardTitle>
          <User id={params.id} />
          <CardTitle>Permissões do Usuário</CardTitle>
          <CardDescription>
            <Link className="flex items-center gap-1" href="">
              <Info size={16} />
              saiba mais
            </Link>
          </CardDescription>
          <RolesProvider>
           <Permission id={params.id} />
          </RolesProvider>
        </CardContent>
      </Card>
    </div>
  )
}

function generateRandomIDs(count: number) {
  const ids: string[] = []
  for (let i = 1; i <= count; i++) {
    ids.push(String(i))
  }
  return ids
}

async function fetchDynamicIDs() {
  return generateRandomIDs(10000)
}

export async function generateStaticParams() {
  const id = await fetchDynamicIDs()
  return id.map(id => ({
    id
  }))
}