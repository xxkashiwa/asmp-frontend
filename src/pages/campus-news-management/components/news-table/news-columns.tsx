import { News } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { NewsActions } from './news-actions';

export const getNewsColumns = (
  onEditNews: (news: News) => void,
  onDeleteNews: (news: News) => void
): ColumnDef<News>[] => [
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'description',
    header: '描述',
  },
  {
    accessorKey: 'publishDate',
    header: '发布日期',
  },
  {
    accessorKey: 'author',
    header: '作者',
  },
  {
    accessorKey: 'category',
    header: '分类',
  },
  {
    accessorKey: 'isActive',
    header: '状态',
    cell: ({ row }) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${row.original.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
      >
        {row.original.isActive ? '已发布' : '未发布'}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <NewsActions
        row={row.original}
        onEdit={onEditNews}
        onDelete={onDeleteNews}
      />
    ),
  },
];