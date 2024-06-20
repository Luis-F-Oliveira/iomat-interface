'use client'

import { Button } from '@/components/ui/button'
import { theme } from '@/lib/theme'
import React from 'react'

export default function Page() {
  const handleTheme = () => {
    theme()
  }

  return (
    <div>
      <Button onClick={handleTheme}>
        trocar tema
      </Button>
    </div>
  )
}
