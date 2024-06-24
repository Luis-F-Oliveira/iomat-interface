import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Page() {
  return (
    <div className='w-full min-h-container grid xl:grid-cols-5 grid-cols-2 gap-2'>
      {[...Array(25)].map((_, index) => (
        <div key={index} className='flex flex-col space-y-2'>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
