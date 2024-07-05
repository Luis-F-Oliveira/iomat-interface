'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { INavigation, IRoles } from './navbar'
import { usePathname } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  navigations: INavigation[]
  roles: IRoles[]
  permissions: string[]
}

const hasPermission = (navigationItem: INavigation, roles: IRoles[], permissions: string[]): boolean => {
  const navigationRoles = roles.filter(role => role.navigation_id === navigationItem.id);
  return navigationRoles.some(role => permissions.includes(role.role.name));
}

export const NavbarUi: React.FC<Props> = ({ navigations, roles, permissions }) => {
  const [path, setPath] = React.useState<string | undefined>(undefined)

  const pathname = usePathname()
  const parts = pathname.split('/').filter(part => part !== '')

  React.useEffect(() => {
    const paths = ['analytics', 'admin']
    const path = parts.find((el) => paths.includes(el))
    setPath(path)
  }, [pathname])

  return (
    <nav className="pr-5 pt-5 flex justify-end items-center">
      <ul className="flex items-center gap-1">
        {navigations.map((items, index) => {
          if (items.route !== path) {
            return null
          }

          if (!hasPermission(items, roles, permissions)) {
            return null
          }

          if (items.replies.length !== 0) {
            return (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant='link'>
                    {items.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {items.replies.map((items, index) => {
                    if (items.route !== path) {
                      return null
                    }
          
                    if (!hasPermission(items, roles, permissions)) {
                      return null
                    }

                    return (
                      <Link key={index} href={items.href}>
                        <DropdownMenuItem className='cursor-pointer'>
                          {items.name}
                        </DropdownMenuItem>
                      </Link>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }

          return (
            <li key={index}>
              <Link href={items.href}>
                <Button variant='link'>
                  {items.name}
                </Button>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}