import { Button } from '../button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import useDataTableStore from '@/stores/data-table-store';

interface DataTablePaginationProps {
  tableId: string;
}

export function DataTablePagination({
  tableId
}: DataTablePaginationProps) {
  const { tables, setPageSize, setPageIndex, getTableState  } = useDataTableStore();
  getTableState(tableId);
  const tableState = tables[tableId];
  if (!tableState) return null;
  const { table, pageSize, pageIndex } = tableState;
  if (!table) return null;

  const pageCount = table.getPageCount?.() ?? 0;
  const canPreviousPage = table.getCanPreviousPage?.() ?? false;
  const canNextPage = table.getCanNextPage?.() ?? false;

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex items-center space-x-2">
        <p className="text-muted-foreground text-sm">每页显示</p>
        <Select
          value={pageSize.toString()}
          onValueChange={value => {
            setPageSize(tableId, Number(value));
            setPageIndex(tableId, 0); // Reset to first page when changing page size
          }}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={pageSize.toString()} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 15, 20, 25, 30].map(size => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-muted-foreground text-sm">条记录</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          第 {pageIndex + 1} 页，共{' '}
          {pageCount} 页
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage?.();
            setPageIndex(tableId, pageIndex - 1);
          }}
          disabled={!canPreviousPage}
        >
          上一页
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage?.();
            setPageIndex(tableId, pageIndex + 1);
          }}
          disabled={!canNextPage}
        >
          下一页
        </Button>
      </div>
    </div>
  );
}
