"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

export interface IData {
  id: number
  order: string
  url: string
  servant_id: string
  created_at: string
  servant: IServant
}

interface IServant {
  id: number
  enrollment: string
  contract: string
  name: string
  email: string
}

export const columns: ColumnDef<IData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "order",
    header: "Portaria",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "servant.name",
    header: "Nome",
  },
  {
    accessorKey: "servant.email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Data",
  },
]
