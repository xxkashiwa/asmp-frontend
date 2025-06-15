import { Organization } from '@/models/organization';
import { ColumnDef } from '@tanstack/react-table';
import { OrganizationActions } from './organization-actions';

export const getOrganizationColumns = (
  onEdit: (organization: Organization) => void,
  onDelete: (organization: Organization) => void
): ColumnDef<Organization>[] => [
  {
    accessorKey: 'name',
    header: '名字',
  },
  {
    accessorKey: 'type',
    header: '类型',
    cell: ({ row }) => {
      const typeMap: Record<string, string> = {
        REGIONAL: '地区性组织',
        INDUSTRIAL: '行业组织',
        INTEREST: '兴趣组织',
      };
      return typeMap[row.original.type] || row.original.type;
    },
  },
  {
    accessorKey: 'description',
    header: '描述',
  },
  {
    accessorKey: 'state',
    header: '状态',
    cell: ({ row }) => {
      const statusMap: Record<string, { text: string; className: string }> = {
        ACTIVE: { text: '活跃中', className: 'text-green-500' },
        DISBAND: { text: '已解散', className: 'text-gray-500' },
      };
      const status = statusMap[row.original.state] || {
        text: row.original.state,
        className: 'text-gray-500',
      };
      return (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.text}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <OrganizationActions
          row={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    },
  },
];
