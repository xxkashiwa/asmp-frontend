import { Input } from '../input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { useDataTable } from './data-table-context';

interface DataTableSearchProps {
  searchKeys?: string[];
  searchLabel?: string;
  searchFieldLabels?: Record<string, string>;
}

export function DataTableSearch({
  searchKeys,
  searchLabel = '搜索...',
  searchFieldLabels,
}: DataTableSearchProps) {
  const { table, currentSearchKey, setCurrentSearchKey } = useDataTable();

  // 获取搜索字段的显示名称
  const getSearchFieldLabel = (key: string): string => {
    if (searchFieldLabels && key in searchFieldLabels) {
      return searchFieldLabels[key];
    }
    return key;
  };

  if (!searchKeys || searchKeys.length === 0) return null;

  return (
    <div className="flex items-center gap-2 py-4">
      <Input
        placeholder={searchLabel}
        value={
          (currentSearchKey &&
            (table.getColumn(currentSearchKey)?.getFilterValue() as string)) ??
          ''
        }
        onChange={event => {
          if (currentSearchKey) {
            table
              .getColumn(currentSearchKey)
              ?.setFilterValue(event.target.value);
          }
        }}
        className="max-w-sm"
      />

      {searchKeys && searchKeys.length > 1 && (
        <Select
          value={currentSearchKey}
          onValueChange={value => {
            // Clear the previous filter
            if (currentSearchKey) {
              table.getColumn(currentSearchKey)?.setFilterValue('');
            }
            setCurrentSearchKey(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择搜索字段" />
          </SelectTrigger>
          <SelectContent>
            {searchKeys.map(key => (
              <SelectItem key={key} value={key}>
                {getSearchFieldLabel(key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
