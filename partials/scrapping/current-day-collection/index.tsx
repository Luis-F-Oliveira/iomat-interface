import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import React from 'react'

export const CurrentDayCollection = () => {
  return (
    <CardContent className='h-auto flex flex-col'>
      <Button size={'sm'}>Buscar</Button>
    </CardContent>
  )
}
