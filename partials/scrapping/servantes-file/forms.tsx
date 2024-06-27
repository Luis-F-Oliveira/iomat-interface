'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { DatabaseBackup, Info } from 'lucide-react'
import { api } from '@/lib/axios'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  file: z.instanceof(File)
})

interface FormsProps {
  token: string | undefined
}

export const Forms: React.FC<FormsProps> = ({ token }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    api.post('servants', values, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      toast({
        title: "Aviso",
        description: "Dados dos servidores atualizados!"
      })
    })
    .catch(() => {
      toast({
        title: "Aviso",
        description: "Dados dos servidores não foram atualizados!"
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex mb-5'>
        <FormField
          control={form.control}
          name='file'
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <div className='flex items-center gap-1'>
                <FormControl>
                  <Input
                    {...fieldProps}
                    onChange={(event) => onChange(event.target.files && event.target.files[0])}
                    className="cursor-pointer"
                    type='file'
                    accept='.xlsx'
                    placeholder='Atualizar banco de dados...'
                  />
                </FormControl>
                <Button type='submit'>
                  <DatabaseBackup />
                </Button>
              </div>
              <FormDescription>
                <Link className="flex items-center gap-1" href="/dashboard/info?information=servants_xlsx">
                  <Info size={16} />
                  formatação do arquivo.
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
