import { Activity } from '@/models/activity';
import { ColumnDef } from '@tanstack/react-table';
import { EventActions } from './event-actions';

export const getEventColumns = (
  onEdit: (event: Activity) => void,
  onDelete: (event: Activity) => void
): ColumnDef<Activity>[] => [
  {
    accessorKey: 'title',
    header: '活动标题',
  },
  {
    accessorKey: 'location',
    header: '地点',
  },
  {
    accessorKey: 'startTime',
    header: '开始时间',
  },
  {
    accessorKey: 'endTime',
    header: '结束时间',
  },
  {
    accessorKey: 'maxParticipants',
    header: '最大参与人数',
    cell: ({ row }) => row.original.maxParticipants || '无限制',
  },
  {
    accessorKey: 'organizer',
    header: '组织者',
    cell: ({ row }) => row.original.organizer.name || '无',
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => {
      const statusMap: Record<string, { text: string; className: string }> = {
        NOT_STARTED: { text: '未开始', className: 'text-yellow-500' },
        STARTED: { text: '进行中', className: 'text-green-500' },
        FINISHED: { text: '已完成', className: 'text-gray-500' },
      };
      const status = statusMap[row.original.status] || {
        text: '未知',
        className: 'text-gray-500',
      };
      return (
        <span
          className={`inline-block rounded-full px-2 py-2 text-xs font-semibold ${status.className}`}
        >
          {status.text}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <EventActions row={row.original} onEdit={onEdit} onDelete={onDelete} />
      );
    },
  },
];
