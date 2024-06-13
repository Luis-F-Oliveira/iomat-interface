import React from 'react';
import { BreadcrumbDinamic } from '@/components/breadcrumb/breadcrumb-dinamic';
import { RadialMenu } from '@/components/navigations';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <main className='container pt-5'>
        {children}
      </main>
      <BreadcrumbDinamic />
      <RadialMenu />
    </div>
  )
}