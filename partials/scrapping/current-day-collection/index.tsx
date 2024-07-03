'use client'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { useScrapping } from '@/context/scrapping'
import { api } from '@/lib/anext'
import React from 'react'

export const CurrentDayCollection = () => {
  const { setterData, active } = useScrapping() 
  const handleSearch = () => {
    active()
    api.post('playwright/current-day-collection', null)
    .then((response) => {
      const savedData = response.data
      setterData(savedData.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <CardContent className='h-auto flex flex-col'>
      <Button onClick={handleSearch} size={'sm'}>Buscar</Button>
    </CardContent>
  )
}
