import { ColumnDef } from '@tanstack/react-table';
import { DataTableContent } from './data-table-content';
import { DataTablePagination } from './data-table-pagination.tsx';
import { DataTableSearch } from './data-table-search';
import useDataTableStore from '@/stores/data-table-store';
import { useEffect } from 'react';
import {

  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,

  useReactTable,
} from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
  tableId: string; // 新增 tableId 属性
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchKeys?: string[];
  searchLabel?: string;
  searchFieldLabels?: Record<string, string>;
}

export function DataTable<TData, TValue>({
  tableId,
  columns,
  data,
  searchKey,
  searchKeys,
  searchLabel = '搜索...',
  searchFieldLabels,
}: DataTableProps<TData, TValue>) {
  const {
    tables,
    initTable,
    setPagination,
    setSorting,
    setColumnFilters,
    setTableData,
    setColumns,
    setCurrentSearchKey,
    setTable,
  } = useDataTableStore();

  // 确保表格状态已初始化
  useEffect(() => {
    if (!tables[tableId]) {
      initTable(tableId);
    }
  }, [tableId, initTable, tables]);

  const tableState = tables[tableId] || {};
  const { sorting, columnFilters, pagination } = tableState;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updater) => setSorting(tableId, updater),
    onColumnFiltersChange: (updater) => setColumnFilters(tableId, updater),
    onPaginationChange: (updater) => setPagination(tableId, updater),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  useEffect(() => {
    setTable(tableId, table);
  }, [table, setTable, tableId]);

  useEffect(() => {
    setTableData(tableId, data);
    setColumns(tableId, columns);
  }, [data, columns, setTableData, setColumns, tableId]);
  
  useEffect(() => {
    setCurrentSearchKey(
      tableId,
      searchKey || (searchKeys && searchKeys.length > 0 ? searchKeys[0] : undefined)
    );
  }, [searchKey, searchKeys, setCurrentSearchKey, tableId]);

  return (
    <div>
      <DataTableSearch
        tableId={tableId}
        searchKeys={searchKeys || (searchKey ? [searchKey] : undefined)}
        searchLabel={searchLabel}
        searchFieldLabels={searchFieldLabels}
      />
      <DataTableContent tableId={tableId}/>
      <DataTablePagination tableId={tableId}/>
    </div>
  );
}
