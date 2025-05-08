import { ColumnDef } from '@tanstack/react-table';
import { Event } from '@/types';
import { EventActions } from './event-actions';

export const getEventColumns = (
  onEdit: (event: Event) => void,
  onDelete: (event: Event) => void
): ColumnDef<Event>[] => [
  {
    accessorKey: 'title',
    header: '活动名称',
  },
  {
    accessorKey: 'type',
    header: '活动类型',
  },
  {
    accessorKey: 'startDate',
    header: '开始日期',
  },
  {
    accessorKey: 'endDate',
    header: '结束日期',
  },
  {
    accessorKey: 'location',
    header: '活动地点',
  },
  {
    accessorKey: 'status',
    header: '状态',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <EventActions row={row.original} onEdit={onEdit} onDelete={onDelete} />;
    },
  },
];