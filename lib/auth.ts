import { formSchema } from '@/app/login/page'
import { z } from 'zod'

export function auth(values: z.infer<typeof formSchema>) {
  console.log(values)
}