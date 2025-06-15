import { ColumnDef } from '@tanstack/react-table';
import { Enterprise } from '@/models/enterprise';
import { EnterpriseActions } from './enterprise-actions';


export const getEnterpriseColumns = (
  handleEdit: (enterprise: Enterprise) => void,
  handleDelete: (enterprise: Enterprise) => void,
): ColumnDef<Enterprise>[] => [

  {
    accessorKey: 'name',
    header: '企业名称',
  },
  {
    accessorKey: 'field',
    header: '领域',
  },
  {
    accessorKey: 'address',
    header: '地址',
  },
  {
    accessorKey: 'contactPerson',
    header: '联系人',
  },
  {
    accessorKey: 'addedAt',
    header: '加入日期',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const enterprise = row.original;
      return (
        <EnterpriseActions
          enterprise={enterprise}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    },
  },
];