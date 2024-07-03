import React from 'react'
import { AdminNavbar } from '@/components/navigations'
import { ScrappingProvider } from '@/context/scrapping'

export default function DataLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ScrappingProvider>
      <div className='mb-14'>
        {children}
      </div>
    </ScrappingProvider>
  )
}