'use client'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { api } from '@/lib/anext'
import React from 'react'

export const CurrentDayCollection = () => {
  const handleSearch = () => {
    api.post('playwright/current-day-collection', null)
  }

  return (
    <CardContent className='h-auto flex flex-col'>
      <Button onClick={handleSearch} size={'sm'}>Buscar</Button>
    </CardContent>
  )
}
