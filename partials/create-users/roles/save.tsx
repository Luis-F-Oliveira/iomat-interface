'use client'

import React from 'react';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useCreateUser } from '@/context/createuser';
import { useRoles } from '@/context/roles';

interface SaveButtonProps {
  token: string
}

export const SaveButton: React.FC<SaveButtonProps> = ({ token }) => {
  const { user } = useCreateUser()
  const { roles } = useRoles()

  const saveData = () => {
    try {
      if (user && roles) {
        roles.forEach((items) => {
          api.post('rolesonusers', {
            'user_id': user.id,
            'role_id': items.id
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        })
      }
    } catch {
      toast({
        title: "Aviso",
        description: "Houve algum erro na atribuição de permissões."
      })
    } finally {
      toast({
        title: "Aviso",
        description: "Permissões atribuidas com successo."
      })
    }
  }

  return <Button className='mt-4' onClick={saveData}>Atribuir</Button>
}