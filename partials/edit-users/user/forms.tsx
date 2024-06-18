"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { api } from '@/lib/axios'
import { IUser } from '../@types/types'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export const formUserSchema = z.object({
  name: z.string().min(1, {
    message: "Nome deve ser preenchido."
  }),
  email: z.string().min(1, {
    message: "Email deve ser preenchido."
  }),
  entry_code: z.string().min(6, {
    message: "Código de acesso deve ser preenchido."
  })
})

interface FormsProps {
  data: IUser
  token: string | undefined
}

export const Forms: React.FC<FormsProps> = ({ data, token }) => {
  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      entry_code: data.entry_code
    }
  })

  const { setValue } = form

  async function onSubmit(values: z.infer<typeof formUserSchema>) {
    await api.put(`users/${data.id}`, values, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        toast({
          title: "Aviso",
          description: "Usuário atualizado!"
        })
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast({
            title: "Aviso",
            description: "Email já existe!"
          })
        }
      })
  }

  const generateEntryCode = async () => {
    setValue('entry_code', 'Criando código...')
    const response = await api.get('entrycode', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const { entry_code } = response.data
    setValue('entry_code', entry_code)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='entry_code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de Entrada</FormLabel>
              <div className='flex items-center gap-1'>
                <FormControl>
                  <Input type='text' disabled {...field} />
                </FormControl>
                <Button type='button' onClick={generateEntryCode}>
                  <RefreshCcw />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='my-1' type='submit'>
          Atualizar
        </Button>
      </form>
    </Form>
  )
}
