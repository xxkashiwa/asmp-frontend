import { ColumnDef } from '@tanstack/react-table';
import { DataTableContent } from './data-table-content';
import { DataTableProvider } from './data-table-context';
import { DataTablePagination } from './data-table-pagination';
import { DataTableSearch } from './data-table-search';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchKeys?: string[];
  searchLabel?: string;
  searchFieldLabels?: Record<string, string>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchKeys,
  searchLabel = '搜索...',
  searchFieldLabels,
}: DataTableProps<TData, TValue>) {
  return (
    <DataTableProvider
      columns={columns}
      data={data}
      searchKey={searchKey}
      searchKeys={searchKeys}
    >
      <div>
        <DataTableSearch
          searchKeys={searchKeys || (searchKey ? [searchKey] : undefined)}
          searchLabel={searchLabel}
          searchFieldLabels={searchFieldLabels}
        />
        <DataTableContent />
        <DataTablePagination />
      </div>
    </DataTableProvider>
  );
}
