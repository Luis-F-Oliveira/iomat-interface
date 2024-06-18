'use client'

import React from 'react'
import { IPermission } from '../@types/types'
import { useRoles } from '@/context/roles'
import { Badge } from '@/components/ui/badge'

interface BadgesProps {
  data: IPermission[]
}

export const Badges: React.FC<BadgesProps> = ({ data }) => {
  const { roles, store, remove } = useRoles()
  const [initialized, setInitialized] = React.useState(false)

  React.useEffect(() => {
    if (!initialized) {
      const existingRoleIds = roles?.map(role => role.id)
      data.forEach(item => {
        if (!existingRoleIds?.includes(item.role.id)) {
          store({ id: item.role.id, name: item.role.name })
        }
      })
      setInitialized(true)
    }
  }, [initialized, data, roles, store])

  return (
    <section className="flex gap-1 flex-wrap">
      {roles?.map((item) => (
        <Badge
          key={item.id}
          className="cursor-pointer hover:bg-red-500 dark:hover:text-white"
          onClick={() => remove(item.id)}
        >
          {item.name}
        </Badge>
      ))}
    </section>
  )
}
