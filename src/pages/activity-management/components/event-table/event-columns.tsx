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
    cell: ({ row }) => row.original.type || '无', 
  },
  {
    accessorKey: 'organizer',
    header: '主办单位',
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
    cell: ({ row }) => {
      const statusMap:Record<string, {text: string, className:string}> = {
        'upcoming': {text: '即将开始', className: 'text-yellow-500'},
        'ongoing': {text: '进行中', className: 'text-green-500'},
        'completed': {text: '已完成', className: 'text-gray-500'},
        'cancelled': {text: '已取消', className: 'text-red-500'},
      };
      const status = statusMap[row.original.status];
      return (
        <span
        className = {`inline-block rounded-full px-2 py-2 text-xs font-semibold ${status.className}`}
        >
          {status.text}
        </span>
      );
    }
  },
  {
    accessorKey: 'maxParticipants',
    header: '最大参与人数',
    cell: ({ row }) => row.original.maxParticipants || '无限制',
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      return <EventActions row={row.original} onEdit={onEdit} onDelete={onDelete} />;
    },
  },
];