import { Enterprise } from '@/models/enterprise';
import { ColumnDef } from '@tanstack/react-table';
import { EnterpriseActions } from './enterprise-actions';

export const getEnterpriseColumns = (
  onEditEnterprise: (enterprise: Enterprise) => void,
  onDeleteEnterprise: (enterprise: Enterprise) => void
): ColumnDef<Enterprise>[] => [
  {
    accessorKey: 'name',
    header: '名字',
  },
  {
    accessorKey: 'field',
    header: '领域',
    cell: ({ row }) => row.original.field || '未填写',
  },
  {
    accessorKey: 'address',
    header: '地址',
    cell: ({ row }) => row.original.address || '未填写',
  },
  {
    accessorKey: 'contactPerson',
    header: '联系人',
    cell: ({ row }) => row.original.contactPerson || '未填写',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <EnterpriseActions
        row={row.original}
        onEdit={onEditEnterprise}
        onDelete={onDeleteEnterprise}
      />
    ),
  },
];
