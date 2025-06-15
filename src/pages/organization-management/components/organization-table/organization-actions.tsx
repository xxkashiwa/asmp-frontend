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

import { Organization } from '@/models/organization';

interface OrganizationActionsProps {
  row: Organization;
  onEdit: (organization: Organization) => void;
  onDelete: (organization: Organization) => void;
}

export function OrganizationActions({
  row,
  onEdit,
  onDelete,
}: OrganizationActionsProps) {
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
        <DropdownMenuItem onClick={() => onEdit(row)}>
          <Edit className="mr-2 h-4 w-4" />
          编辑
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row)}>
          <Trash className="mr-2 h-4 w-4" />
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
