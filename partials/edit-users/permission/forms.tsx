'use client'

import React from 'react'
import { IRole } from '../@types/types'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRoles } from '@/context/roles'

interface FormsProps {
  data: IRole[]
}

const FormSchema = z.object({
  role: z.string({
    required_error: "Por favor selecione uma permissão."
  })
})

export const Forms: React.FC<FormsProps> = ({ data }) => {
  const { store } = useRoles()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const selectedRole = values.role
    const selectedRoleObj: IRole | undefined = data.find((item) => item.name === selectedRole)
    if (selectedRoleObj) {
      store(selectedRoleObj)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-1 items-center">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Permissões" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.map((items) => (
                      <SelectItem key={items.id} value={`${items.name}`}>{items.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit">
                  <Plus />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

