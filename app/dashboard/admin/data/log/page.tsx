'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useScrapping } from '@/context/scrapping'
import { HardDriveDownload } from "lucide-react"
import Link from "next/link"
import React from 'react'

export default function Page() {
  const { data, storeData } = useScrapping()

  return (
    <div>
      <div className="flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HardDriveDownload onClick={storeData} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Salvar no banco</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {data.map((items, index) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{items.order}</AccordionTrigger>
            <AccordionContent>
              <p>
                URL: <Link href={items.url} target="_blank">{items.url}</Link>
              </p>
              <p>
                Nomes:
              </p>
              <ul className="ml-2">
                {items.servants.map((items, index) => (
                  <li key={index}>{items.name.toLowerCase()}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}
