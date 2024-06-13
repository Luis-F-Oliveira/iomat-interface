'use server'

import { api } from './axios';
import { cookies } from 'next/headers';
import { FormSchema } from '@/app/login/forms';
import { z } from 'zod';

export async function auth(data: z.infer<typeof FormSchema>) {
  const response = await api.post('login', data)
  const { token } = response.data
  cookies().set('auth-token', token)
  return response.data.user
}