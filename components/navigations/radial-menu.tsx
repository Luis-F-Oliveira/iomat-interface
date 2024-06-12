"use client"

import { Plus, BarChart3, Info, Settings, LayoutDashboard, LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const MenuButtons = () => {
  const [open, setOpen] = React.useState(false)
  const menusCss = `dark:hover:bg-neutral-950 text-white hover:bg-white 
  rounded-full w-8 h-8 p-1.5 cursor-pointer transition-colors hover:text-black
  dark:text-black dark:hover:text-white`
  const menus = [
    {
      icon: <BarChart3 className={menusCss} />,
      url: "/dashboard/overview/analytics"
    },
    {
      icon: <Settings className={menusCss} />,
      url: "/dashboard/configuration"
    },
    {
      icon: <LayoutDashboard className={menusCss} />,
      url: "/admin"
    },
    {
      icon: <Info className={menusCss} />,
      url: "/dashboard/info"
    },
  ]

  return (
    <div className='fixed bottom-5 left-1/2 transform -translate-x-1/2'>
      <div className='flex flex-col gap-2 items-center'>
        {open ? (
          <nav className='p-1 rounded-md flex items-center gap-1 bg-neutral-950 dark:bg-white'>
            {menus.map((items, index) => (
              <Link href={items.url} key={index}>
                {items.icon}
              </Link>
            ))}
            <LogOut 
              className='text-red-500 hover:bg-red-500 rounded-full h-8 w-8 p-1.5
              hover:text-white cursor-pointer'
            />
          </nav>
        ) : null}
        <Plus
          className={`bg-neutral-950 text-white dark:bg-white dark:text-black
          rounded-full w-8 h-8 p-1 cursor-pointer transition-all 
          ${open ? 'rotate-45' : 'rotate-0'}`}
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  )
}