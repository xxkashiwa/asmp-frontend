import { ColumnDef } from '@tanstack/react-table';
import { Partnership } from '@/types';
import { PartnershipActions } from './partnership-actions';


export const getPartnershipColumns = (
  handleEdit: (partnership: Partnership) => void,
  handleDelete: (partnership: Partnership) => void,
): ColumnDef<Partnership>[] => [
  {
    accessorKey: 'name',
    header: '合作伙伴名称',
  },
  {
    accessorKey: 'type',
    header: '合作类型',
  },
  {
    accessorKey: 'contactPerson',
    header: '联系人',
  },
  {
    accessorKey: 'contactPhone',
    header: '联系电话',
  },
  {
    accessorKey: 'contactEmail',
    header: '邮箱',
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => {
      const statusMap: Record<string, { text: string, className: string }> = {
        '进行中': { text: '进行中', className: 'bg-green-100 text-green-800' },
        '待启动': { text: '待启动', className: 'bg-yellow-100 text-yellow-800' },
        '已完成': { text: '已完成', className: 'bg-gray-100 text-gray-800' },
        '已终止': { text: '已终止', className: 'bg-red-100 text-red-800' },
      };
      
      const status = statusMap[row.original.status] 
  
      return (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.text}
        </span>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const partnership = row.original;
      return (
        <PartnershipActions
          partnership={partnership}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    },
  },
];