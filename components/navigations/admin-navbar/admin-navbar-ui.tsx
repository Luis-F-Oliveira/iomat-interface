"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

interface AdminNavbarUiProps {
  data: string[]
}

export const AdminNavbarUi: React.FC<AdminNavbarUiProps> = ({ data }) => {
  const menus = [
    {
      name: "Usuários",
      url: "/dashboard/admin/users",
      permissions: ["admin", "moderador"]
    },
    {
      name: "Permissões",
      url: "/dashboard/admin/data/log",
      permissions: ["admin", "moderador"]
    },
    {
      name: "Coleta de Dados",
      url: "/dashboard/admin/data",
      permissions: ["extrator"]
    }
  ]

  return (
    <nav className="flex justify-end mb-5">
      <ul className="flex items-center">
        {menus.map((items, index) => (
          <li key={index}>
            {items.permissions.some(item => data.includes(item)) ? (
              <Button variant={'link'}>
                <Link href={items.url}>
                  {items.name}
                </Link>
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}