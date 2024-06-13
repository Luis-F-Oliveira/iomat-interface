'use client'

import React from "react"
import type { IRoles } from "@/partials/create-users/roles/roles"
import { toast } from "@/components/ui/use-toast"

interface RolesContextProps {
  roles: IRoles[] | null
  store: (abilityData: IRoles) => void
  remove: (id: number) => void
}

interface RolesProviderProps {
  children: React.ReactNode
}

const RolesContext = React.createContext({} as RolesContextProps)

export function useRoles() {
  const context = React.useContext(RolesContext)
  if (!context) {
    throw new Error('useRoles deve ser usado dentro de um RolesProvider')
  }
  return context
}

export function RolesProvider({ children }: RolesProviderProps) {
  const [roles, setRoles] = React.useState<IRoles[]>([])

  function store(roleData: IRoles) {
    const isDuplicate = roles.some((role) => role.id === roleData.id)
    if (isDuplicate) {
      toast({
        title: "Aviso",
        description: "Essa permissão já foi atribuida, escolha outra."
      })
      return
    }
    setRoles((prev) => [...prev, roleData])
  }

  function remove(id: number) {
    const updatedRoles = roles.filter((role) => role.id !== id)
    setRoles(updatedRoles)
  }

  return (
    <RolesContext.Provider
      value={{ roles, store, remove }}
    >
      {children}
    </RolesContext.Provider>
  )
}