import { News } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { NewsActions } from './notice-actions';

export const  getNewsColumns = (
    onEdit: (news: News) => void,
    onDelete: (news: News) => void
): ColumnDef<News>[] => [
    {
        header: '标题',
        accessorKey: 'title',
    },
    {
        header: '内容',
        accessorKey: 'content',
    },
    {
        header: '作者',
        accessorKey: 'author',
    },
    {
        header: '发布时间',
        accessorKey: 'publishDate',
    },
    {
        header: '分类',
        accessorKey: 'category',
    },
    {
            header: '状态',
            accessorKey: 'isActive',
            cell: ({ row }) => {
                const statusMap: Record<string, { text: string, className: string }> = {
                    'true': { text: '已发布', className: 'bg-green-100 text-green-800' },
                    'false': { text: '未发布', className: 'bg-red-100 text-red-800' }
                }; 
                const status = statusMap[String(row.original.isActive)];   
                return (
                    <span
                        className = {`inline-block rounded-full px-2 py-2 text-xs font-semibold ${status.className}`}
                    >
                        {status.text}
                    </span>
                );
        }  ,
    },
    {
        header: '观看数',
        accessorKey: 'views',
        cell: ({ row })=> (
            <span>
                {row.original.views||0}
            </span>
        )
    },
    {
        header: '操作',
        accessorKey: 'actions',
        cell: ({row}) => (
            <NewsActions 
                row={row.original}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ),
    },
];