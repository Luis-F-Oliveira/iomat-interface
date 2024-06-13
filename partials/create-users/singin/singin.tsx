"use client"

import { api } from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RefreshCcw } from 'lucide-react'
import { useCreateUser } from '@/context/createuser'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ser preenchido"
  }),
  email: z.string().min(2, {
    message: "Email deve ser preenchido"
  }),
  entry_code: z.string().min(6, {
    message: "Código de entrada deve ser criado"
  })
})

interface SinginProps {
  token: string
}

export default function Singin({ token }: SinginProps) {
  const { setterUser } = useCreateUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      entry_code: ""
    }
  })

  const { setValue } = form

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await api.post('users', values, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    setterUser(response.data)
  }

  const generateEntryCode = async () => {
    setValue('entry_code', 'Criando código...')
    const response = await api.get('entrycode', {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    const { entry_code } = response.data
    setValue('entry_code', entry_code)
  }

  return (
    <section>
      <h1 className="text-2xl mb-5">
        Cadastrar Usuário <span className='text-red-500'>*</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entry_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de Entrada</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <Button onClick={generateEntryCode} type="button">
                    <RefreshCcw />
                  </Button>
                </div>
                <FormDescription>
                  Código responsável para o login do usuário.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Cadastrar
          </Button>
        </form>
      </Form>
    </section>
  )
}
