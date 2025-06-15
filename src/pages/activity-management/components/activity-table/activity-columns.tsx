import { Activity } from '@/models/activity';
import { ColumnDef } from '@tanstack/react-table';
import { ActivityActions } from './activity-actions';

export const getActivityColumns = (
  onEditActivity: (activity: Activity) => void,
  onDeleteActivity: (activity: Activity) => void
): ColumnDef<Activity>[] => [
  {
    accessorKey: 'title',
    header: '活动标题',
  },
  {
    accessorKey: 'location',
    header: '活动地点',
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
    accessorKey: 'description',
    header: '活动简介',
    cell: ({ row }) => {
      const description = row.original.description;
      return description.length > 30
        ? `${description.slice(0, 30)}...`
        : description;
    },
  },
  {
    accessorKey: 'maxParticipants',
    header: '最大参与人数',
  },
  {
    accessorKey: 'organizer',
    header: '组织者',
    cell: ({ row }) => row.original.organizer.name || '未填写',
  },
  {
    accessorKey: 'status',
    header: '活动状态',
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case 'NOT_STARTED':
          return (
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              未开始
            </span>
          );
        case 'STARTED':
          return (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
              进行中
            </span>
          );
        case 'FINISHED':
          return (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
              已结束
            </span>
          );
        default:
          return status;
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActivityActions
        row={row.original}
        onEdit={onEditActivity}
        onDelete={onDeleteActivity}
      />
    ),
  },
];
