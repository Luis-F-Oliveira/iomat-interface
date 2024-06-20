'use client'

import React from 'react'
import { addDays, format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
import { CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ptBR } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DATE_REQUIRED_ERROR = 'Data deve ser determinada!'

export const formSchema = z.object({
  date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }, { required_error: DATE_REQUIRED_ERROR }).refine((date) => {
    return !!date.from;
  }, DATE_REQUIRED_ERROR)
});

export const CollectionByDate = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: {
        from: undefined,
        to: undefined
      }
    }
  })

  function formatDates(values: z.infer<typeof formSchema>) {
    const formattedDates = {
      from: values.date.from ? format(values.date.from, 'dd/MM/yyyy', { locale: ptBR }) : undefined,
      to: values.date.to ? format(values.date.to, 'dd/MM/yyyy', { locale: ptBR }) : undefined,
    }
    return formattedDates
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(formatDates(values))
  }

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} -{" "}
                              {format(field.value.to, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </>
                          ) : (
                            format(field.value.from, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value.from}
                        selected={{ from: field.value.from!, to: field.value.to }}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormDescription>
                  É recomendável a utilização da ultima data não passar o dia atual.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' size={'sm'}>
            Buscar
          </Button>
        </form>
      </Form>
    </CardContent>
  )
}
