import { Alumni } from '@/models/alumni';
import { ColumnDef } from '@tanstack/react-table';
import { AlumniActions } from './alumni-actions';

export const getAlumniColumns = (
  onEditAlumni: (alumni: Alumni) => void,
  onDeleteAlumni: (alumni: Alumni) => void
): ColumnDef<Alumni>[] => [
  {
    accessorKey: 'studentId',
    header: '学号',
  },
  {
    accessorKey: 'realName',
    header: '姓名',
  },
  {
    accessorKey: 'gender',
    header: '性别',
    cell: ({ row }) => (row.original.gender === 'MALE' ? '男' : '女'),
  },
  {
    accessorKey: 'dateOfBirth',
    header: '生日',
  },
  {
    accessorKey: 'address',
    header: '地址',
    cell: ({ row }) => row.original.address || '未填写',
  },
  {
    accessorKey: 'companyName',
    header: '公司名',
    cell: ({ row }) => row.original.companyName || '未填写',
  },
  {
    accessorKey: 'currentJob',
    header: '工作名',
    cell: ({ row }) => row.original.currentJob || '未填写',
  },
  { accessorKey: 'addedAt', header: '加入日期' },
  {
    id: 'actions',
    cell: ({ row }) => (
      <AlumniActions
        row={row.original}
        onEdit={onEditAlumni}
        onDelete={onDeleteAlumni}
      />
    ),
  },
];
