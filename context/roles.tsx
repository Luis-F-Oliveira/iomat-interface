'use client'

import React from "react"
import type { IRoles } from "@/partials/create-users/roles/roles"

interface RolesContextProps {
  roles: IRoles[] | null
  store: (roleData: IRoles) => void
  remove: (id: number) => void
}

interface RolesProviderProps {
  children: React.ReactNode
}

const RolesContext = React.createContext({} as RolesContextProps)

export function useRoles() {
  const context = React.useContext(RolesContext)
  if (!context) {
    throw new Error('useRoles must be used within a RolesProvider')
  }
  return context
}

export function RolesProvider({ children }: RolesProviderProps) {
  const [roles, setRoles] = React.useState<IRoles[]>([])

  const store = React.useCallback((roleData: IRoles) => {
    setRoles((prevRoles) => {
      if (prevRoles.some(existingRole => existingRole.id === roleData.id)) {
        return prevRoles
      }

      return [...prevRoles, roleData]
    })
  }, [])

  const remove = React.useCallback((id: number) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id))
  }, [])

  return (
    <RolesContext.Provider
    value={{ roles, store, remove }}
    >
      {children}
    </RolesContext.Provider>
  )
}
