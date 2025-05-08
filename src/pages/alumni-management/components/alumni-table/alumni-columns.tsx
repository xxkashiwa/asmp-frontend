import { Alumni } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { AlumniActions } from './alumni-actions';

export const getAlumniColumns = (
  onEditAlumni: (alumni: Alumni) => void,
  onDeleteAlumni: (alumni: Alumni) => void
): ColumnDef<Alumni>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'studentId',
    header: '学号',
  },
  {
    accessorKey: 'name',
    header: '姓名',
  },
  {
    accessorKey: 'gender',
    header: '性别',
  },
  {
    accessorKey: 'school',
    header: '学院',
  },
  {
    accessorKey: 'major',
    header: '专业',
  },
  {
    accessorKey: 'graduationYear',
    header: '毕业年份',
  },
  {
    accessorKey: 'degree',
    header: '学位',
  },
  {
    accessorKey: 'currentCompany',
    header: '当前公司',
    cell: ({ row }) => row.original.currentCompany || '未填写',
  },
  {
    accessorKey: 'jobPosition',
    header: '职位',
    cell: ({ row }) => row.original.jobPosition || '未填写',
  },
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
