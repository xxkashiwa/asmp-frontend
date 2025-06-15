import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Enterprise } from '@/models/enterprise';

interface EnterpriseActionsProps {
  enterprise: Enterprise;
  onEdit: (enterprise: Enterprise) => void;
  onDelete: (enterprise: Enterprise) => void;
}

export function EnterpriseActions({

  enterprise,
  onEdit,
  onDelete,
}: EnterpriseActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">打开菜单</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>操作</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => onEdit(enterprise)}>
        <Edit className="mr-2 h-4 w-4" />
        编辑
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onDelete(enterprise)}>
        <Trash className="mr-2 h-4 w-4" />
        删除
      </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}