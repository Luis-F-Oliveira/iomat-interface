"use client"
import React from "react"

interface IUser {
  id: string
  name: string
  email: string
  access: string
}

interface UserContextProps {
  user: IUser | null,
  loginUser: (userData: IUser) => void,
  logoutUser: () => void
}

const UserContext = React.createContext({} as UserContextProps)

export function useUser() {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: React.ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = React.useState<IUser | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  })

  function loginUser(userData: IUser) {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function logoutUser() {
    setUser(null)
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}