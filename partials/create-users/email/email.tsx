'use client'

import { api } from '@/lib/anext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendHorizontal } from 'lucide-react'
import { useCreateUser } from '@/context/createuser'
import { toast } from '@/components/ui/use-toast'

export const Email = () => {
  const { user } = useCreateUser()

  const sendEmail = () => {
    api.post('senduseracess', user)
      .then(() => {
        toast({
          title: "Aviso",
          description: "Email enviado!"
        })
      })
      .catch(() => {
        toast({
          title: "Aviso",
          description: "Erro ao enviar o email!"
        })
      })
  }

  return (
    <section>
      <h1 className="text-2xl mb-5">
        Enviar Acesso
      </h1>
      <div className="flex items-center gap-1">
        <Input disabled value={user?.email} />
        <Button onClick={sendEmail}>
          <SendHorizontal />
        </Button>
      </div>
    </section>
  )
}