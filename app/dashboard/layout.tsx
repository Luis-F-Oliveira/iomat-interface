import React from 'react';
import { BreadcrumbDinamic } from '@/components/breadcrumb/breadcrumb-dinamic';
import { RadialMenu } from '@/components/navigations';
import { UserProvider } from '@/context/user';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <main className='container pt-5'>
        {children}
      </main>
      <BreadcrumbDinamic />
      <RadialMenu />
    </UserProvider>
  )
}