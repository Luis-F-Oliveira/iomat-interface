import React from 'react';
import { BreadcrumbDinamic } from '@/components/breadcrumb/breadcrumb-dinamic';
import { Navbar, RadialMenu } from '@/components/navigations';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        {children}
      </main>
      <BreadcrumbDinamic />
      <RadialMenu />
    </div>
  )
}