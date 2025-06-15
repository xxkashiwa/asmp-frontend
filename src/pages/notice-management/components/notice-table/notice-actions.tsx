import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Notice } from '@/models/notice';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

interface NoticeActionsProps {
  row: Notice;
  onEdit: (notice: Notice) => void;
  onDelete: (notice: Notice) => void;
}

export function NoticeActions({ row, onEdit, onDelete }: NoticeActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">打开菜单</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(row)}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>编辑</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row)}>
          <Trash className="mr-2 h-4 w-4" />
          <span>删除</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
