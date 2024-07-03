'use client'
import React, { useContext, createContext } from "react"
import type { IUser } from "@/app/dashboard/admin/users/columns"

interface CreateUserContextProps {
  user: IUser | null,
  setterUser: (userData: IUser) => void
}

const CreateUserContext = createContext({} as CreateUserContextProps)

export function useCreateUser() {
  const context = useContext(CreateUserContext)
  if (!context) {
    throw new Error('useCreateUser must be used within a CreateUserProvider')
  }
  return context
}

interface CreateUserProviderProps {
  children: React.ReactNode
}

export function CreateUserProvider({ children }: CreateUserProviderProps) {
  const [user, setUser] = React.useState<IUser | null>(() => {
    const savedUser = localStorage.getItem('creatinguser');
    return savedUser ? JSON.parse(savedUser) : null;
  })

  function setterUser(userData: IUser) {
    setUser(userData)
    localStorage.setItem('creatinguser', JSON.stringify(userData))
  }

  return (
    <CreateUserContext.Provider value={{ user, setterUser }}>
      {children}
    </CreateUserContext.Provider>
  )
}
