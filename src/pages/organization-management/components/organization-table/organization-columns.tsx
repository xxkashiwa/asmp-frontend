import { ColumnDef } from '@tanstack/react-table';
import { Organization } from '@/types';
import { OrganizationActions } from './organization-actions';

export function getOrganizationColumns(
  onEdit: (organization: Organization) => void,
  onDelete: (organization: Organization) => void
): ColumnDef<Organization>[] {
  return [
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
  },
  {
    accessorKey: 'location',
    header: '所在地',
  },
  {
    accessorKey: 'memberCount',
    header: '成员数量',
  },
  {
    accessorKey: 'status',
    header: '状态',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <OrganizationActions row={row.original} onEdit={onEdit} onDelete={onDelete} />;
    },
  },
];
}