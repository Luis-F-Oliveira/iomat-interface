'use server'

import { cookies } from "next/headers"

export const theme = () => {
  const theme = cookies().get('theme')?.value

  if (theme === 'dark') {
    cookies().set('theme', 'light')
  } else {
    cookies().set('theme', 'dark')
  }
}