"use client"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react"

export const BreadcrumbDinamic = () => {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(part => part !== '')
  return (
    <section className="fixed bottom-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>System</BreadcrumbPage>
          </BreadcrumbItem>
          {parts.map((part, index) => {
            return (
              <Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === parts.length - 1 ? (
                    <BreadcrumbPage>{part.charAt(0).toUpperCase() + part.slice(1)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className="cursor-default">{part.charAt(0).toUpperCase() + part.slice(1)}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  )
}