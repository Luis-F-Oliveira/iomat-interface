'use client'

import React from "react"
import { TypingEffect } from "@/components/typing/typing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { api } from "@/lib/anext"
import { toast } from "@/components/ui/use-toast"

interface ContextProps {
  data: IData[]
  active: () => void
  setterData: (data: IData[]) => void
  storeData: () => void
}

interface ProviderProps {
  children: React.ReactNode
}

export interface IData {
  order: string
  url: string
  servants: IServants[]
}

export interface IServants {
  id: number
  enrollment: string
  contract: string
  name: string
  email: string
}

const Span = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-50">
      <div className="flex h-full justify-center items-center">
        <Card className="bg-neutral-950 dark:bg-white text-white dark:text-black">
          <CardHeader>
            <CardTitle>
              Aviso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TypingEffect
              speed={50}
              repeatDelay={5000}
              text=" Dados estão sendo coletados, por favor aguarde..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const CreateUserContext = React.createContext({} as ContextProps)

export function useScrapping() {
  const context = React.useContext(CreateUserContext)
  if (!context) {
    throw new Error('useScrapping must be used within a RolesProvider')
  }
  return context
}

export const ScrappingProvider: React.FC<ProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<IData[]>([])
  const [isActive, setIsActive] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const savedUser = localStorage.getItem('scrapping');
    if (savedUser) {
      setData(JSON.parse(savedUser));
    }
  }, [])

  const active = () => {
    setIsActive(true)
  }

  const setterData = (data: IData[]) => {
    setIsActive(false)
    setData(data)
    localStorage.setItem('scrapping', JSON.stringify(data))
    router.push('/dashboard/admin/data/log')
  }

  const storeData = () => {
    api.post('collected_data', data)
      .then((response) => {
        toast({
          title: "Aviso",
          description: `${response.data.data.message}`
        })
      })
  }

  return (
    <CreateUserContext.Provider value={{ data, active, setterData, storeData }}>
      {children}
      {isActive && <Span />}
    </CreateUserContext.Provider>
  )
}
