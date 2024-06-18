'use client'

import React from 'react'
import { api } from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useRoles } from '@/context/roles'
import { useRouter } from 'next/navigation'

interface SaveButtonProps {
  id: string
  token: string | undefined
}

export const SaveButton: React.FC<SaveButtonProps> = ({ id, token }) => {
  const { roles } = useRoles()

  const handleData = () => {
    try {
      if (roles) {
        api.delete(`permissions/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        roles.forEach((items) => {
          api.post('rolesonusers', {
            'user_id': id,
            'role_id': items.id
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        })
      }

      toast({
        title: "Aviso",
        description: "Permissões atualizadas!"
      })
    } catch {
      toast({
        title: "Aviso",
        description: "Houve algum erro na atribuição de permissões."
      })
    }
  }

  return <Button onClick={handleData}>Atualizar</Button>
}