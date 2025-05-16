import { ColumnDef } from '@tanstack/react-table';
import { Organization } from '@/types';
import { OrganizationActions } from './organization-actions';

export const getOrganizationColumns = (
  onEdit: (organization: Organization) => void,
  onDelete: (organization: Organization) => void
): ColumnDef<Organization>[] => [
  {
    accessorKey: 'name',
    header: '组织名称',
  },
  {
    accessorKey: 'type',
    header: '组织类型',
  },
  {
    accessorKey: 'leader',
    header: '负责人',
  },
  {
    accessorKey: 'contact',
    header: '联系方式',
    cell: ({ row }) => {
      return (
        <div>
          <span>
            {row.original.contact || '未填写'}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'location',
    header: '所在地',
  },
  {
    accessorKey: 'memberCount',
    header: '成员数量',
    cell: ({ row }) => {
      return (
        <div>
          <span>
            {row.original.memberCount || '未填写'}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => {
      const statusMap: Record<string, {text: string, className: string}> = {
        active: {text: '活跃中', className: 'text-green-500'},
        inactive: {text: '未运行', className: 'text-gray-500'},
      };
      const status = statusMap[row.original.status];
      return (
        <span
          className={`inline-block rounded-full px-2 py-2 text-xs font-semibold ${status.className}`}
        >
          {status.text}
        </span>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <OrganizationActions row={row.original} onEdit={onEdit} onDelete={onDelete} />;
    },
  },
];