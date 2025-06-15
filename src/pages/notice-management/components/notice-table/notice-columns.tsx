import { Notice } from '@/models/notice';
import { ColumnDef } from '@tanstack/react-table';
import { NoticeActions } from './notice-actions';

// 通知类型的中文映射
const noticeTypeLabels: Record<string, string> = {
  news: '新闻',
  announcement: '公告',
  notice: '通知',
};

export const getNoticeColumns = (
  onEditNotice: (notice: Notice) => void,
  onDeleteNotice: (notice: Notice) => void
): ColumnDef<Notice>[] => [
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'content',
    header: '内容',
    cell: ({ row }) => {
      const content = row.original.content;
      // 显示内容的前30个字符，如果内容长度超过30个字符则显示...
      return content.length > 30 ? `${content.substring(0, 30)}...` : content;
    },
  },
  {
    accessorKey: 'type',
    header: '类型',
    cell: ({ row }) => noticeTypeLabels[row.original.type] || row.original.type,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <NoticeActions
        row={row.original}
        onEdit={onEditNotice}
        onDelete={onDeleteNotice}
      />
    ),
  },
];
