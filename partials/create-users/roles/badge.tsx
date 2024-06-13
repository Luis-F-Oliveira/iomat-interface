'use client'
import { Badge } from "@/components/ui/badge"
import { useRoles } from "@/context/roles"

export const Badges = () => {
  const { roles, remove } = useRoles()
  return (
    <section className="space-x-1">
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