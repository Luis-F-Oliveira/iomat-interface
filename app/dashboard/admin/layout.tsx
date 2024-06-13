import React from 'react';
import { AdminNavbar } from '@/components/navigations';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='container'>
      <AdminNavbar />
      {children}
    </div>
  )
}