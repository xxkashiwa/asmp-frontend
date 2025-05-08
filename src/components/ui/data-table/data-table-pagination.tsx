import { Button } from '../button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { useDataTable } from './data-table-context';

export function DataTablePagination() {
  const { table, pageSize, setPageSize, pageIndex, setPageIndex } =
    useDataTable();

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex items-center space-x-2">
        <p className="text-muted-foreground text-sm">每页显示</p>
        <Select
          value={pageSize.toString()}
          onValueChange={value => {
            setPageSize(Number(value));
            setPageIndex(0); // Reset to first page when changing page size
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
          第 {table.getState().pagination.pageIndex + 1} 页，共{' '}
          {table.getPageCount()} 页
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
            setPageIndex(pageIndex - 1);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          上一页
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            setPageIndex(pageIndex + 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          下一页
        </Button>
      </div>
    </div>
  );
}
