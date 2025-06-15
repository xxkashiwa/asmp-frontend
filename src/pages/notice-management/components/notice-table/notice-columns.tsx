import { Notice } from '@/models/notice';
import { ColumnDef } from '@tanstack/react-table';
import { NoticeActions } from './notice-actions';

export const  getNoticeColumns = (
    onEdit: (notice: Notice) => void,
    onDelete: (notice: Notice) => void
): ColumnDef<Notice>[] => [
    {
        header: '标题',
        accessorKey: 'title',
    },
    {
        header: '内容',
        accessorKey: 'content',
    },
    {
        header: '类型',
        accessorKey: 'type',
        cell: ({ row }) => {
            const typeMap: Record<string, { text: string, className: string }> = {
                'news': { text: '新闻', className: 'bg-blue-100 text-blue-800' },
                'announcement': { text: '公告', className: 'bg-purple-100 text-purple-800' },
                'notice': { text: '通知', className: 'bg-amber-100 text-amber-800' }
            };
            const type = typeMap[row.original.type] || { text: row.original.type, className: 'bg-gray-100 text-gray-800' };
            return (
                <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${type.className}`}
                >
                    {type.text}
                </span>
            );
        },
    },
    {
        header: '操作',
        accessorKey: 'actions',
        cell: ({row}) => (
            <NoticeActions 
                row={row.original}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ),
    },
];