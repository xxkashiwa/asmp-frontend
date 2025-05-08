/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import React, { createContext, useContext, useState } from 'react';

export interface DataTableState<TData, TValue> {
  table: Table<TData>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageIndex: number;
  setPageIndex: (index: number) => void;
  currentSearchKey?: string;
  setCurrentSearchKey: (key: string | undefined) => void;
}

export interface DataTableProviderProps<TData, TValue> {
  children: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchKeys?: string[];
}

const DataTableContext = createContext<DataTableState<any, any> | null>(null);

export function DataTableProvider<TData, TValue>({
  children,
  columns,
  data,
  searchKey,
  searchKeys,
}: DataTableProviderProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [currentSearchKey, setCurrentSearchKey] = useState<string | undefined>(
    searchKey ||
      (searchKeys && searchKeys.length > 0 ? searchKeys[0] : undefined)
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  // Update pagination state when pageSize or pageIndex changes
  React.useEffect(() => {
    setPagination({
      pageIndex,
      pageSize,
    });
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  const contextValue: DataTableState<TData, TValue> = {
    table,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pageSize,
    setPageSize,
    pageIndex,
    setPageIndex,
    currentSearchKey,
    setCurrentSearchKey,
  };

  return (
    <DataTableContext.Provider value={contextValue}>
      {children}
    </DataTableContext.Provider>
  );
}

export function useDataTable<TData, TValue>(): DataTableState<TData, TValue> {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error('useDataTable must be used within a DataTableProvider');
  }
  return context as DataTableState<TData, TValue>;
}
