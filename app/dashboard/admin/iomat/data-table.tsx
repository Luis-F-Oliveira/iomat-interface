"use client"

import React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { IData } from "./columns"

import { HardDriveUpload } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { api } from "@/lib/axios"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  token: string | undefined
}

export function DataTable<TData extends IData, TValue>({
  columns,
  data,
  token
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [selectedOption, setSelectedOption] = React.useState('servant_name')
  const [rowSelectionId, setRowSelectionId] = React.useState<number[]>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [isClient, setIsClient] = React.useState(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  React.useEffect(() => {
    let id: number[] = []
    table.getFilteredSelectedRowModel().rows.forEach((items) => {
      id.push(items.original.id)
    })
    setRowSelectionId(id)
  }, [rowSelection])

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const handleExportData = async () => {
    const response = await api.post('exportdata', rowSelectionId, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const blob = new Blob(
      [response.data], 
      { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      }
    )

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = 'iomat.xlsx'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!isClient) {
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="w-1/3 grid grid-cols-3 gap-1 items-center">
          <Select
            value={selectedOption}
            onValueChange={(value) => {
              setSelectedOption(value)
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">Portaria</SelectItem>
              <SelectItem value="url">URL</SelectItem>
              <SelectItem value="servant_name">Nome</SelectItem>
              <SelectItem value="servant_email">Email</SelectItem>
              <SelectItem value="created_at">Data</SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="col-span-2"
            placeholder="Filtrar..."
            value={(table.getColumn(selectedOption)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(selectedOption)?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button size='sm' onClick={handleExportData}>
                  <HardDriveUpload />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exportar dados selecionados</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Colunas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linhas(s) selecionadas.
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
