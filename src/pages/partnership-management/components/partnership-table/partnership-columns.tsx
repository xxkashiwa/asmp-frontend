import { ColumnDef } from '@tanstack/react-table';
import { Partnership } from '@/types';
import { PartnershipActions } from './partnership-actions';

interface GetPartnershipColumnsProps {
  handleEdit: (partnership: Partnership) => void;
  handleDelete: (partnership: Partnership) => void;
}

export function getPartnershipColumns(
  handleEdit: GetPartnershipColumnsProps['handleEdit'],
  handleDelete: GetPartnershipColumnsProps['handleDelete'],
): ColumnDef<Partnership>[] {
  return [
  {
    accessorKey: 'name',
    header: '合作伙伴名称',
  },
  {
    accessorKey: 'type',
    header: '合作类型',
  },
  {
    accessorKey: 'contact',
    header: '联系人',
  },
  {
    accessorKey: 'phone',
    header: '联系电话',
  },
  {
    accessorKey: 'email',
    header: '电子邮箱',
  },
  {
    accessorKey: 'startDate',
    header: '合作开始日期',
  },
  {
    accessorKey: 'endDate',
    header: '合作结束日期',
  },
  {
    accessorKey: 'status',
    header: '状态',
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
];}