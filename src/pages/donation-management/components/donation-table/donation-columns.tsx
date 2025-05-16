import { Donation } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { DonationActions } from './donation-actions';

export const getDonationColumns = (
  onEdit: (donation: Donation) => void,
  onDelete: (donation: Donation) => void
): ColumnDef<Donation>[] => [
  {
    accessorKey: 'donorName',
    header: '捐赠人',
  },
  {
    accessorKey: 'amount',
    header: '金额',
    cell: ({ row }) => (
      <span>
        {row.original.amount.toLocaleString()} 元
      </span>
    ),
  },
  {
    accessorKey: 'projectName',
    header: '项目名称',
    cell: ({ row }) => (
      <span>
        {row.original.projectName || '无'}
      </span>
    )
  },
  {
    accessorKey: 'donationDate',
    header: '捐赠日期',
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => {
      const statusMap = {
        pending: { text: '处理中', className: 'bg-yellow-100 text-yellow-800' },
        completed: { text: '已完成', className: 'bg-green-100 text-green-800' },
        cancelled: { text: '已取消', className: 'bg-red-100 text-red-800' },
      };
      const status = statusMap[row.original.status];

      return (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.text}
        </span>
      );
    },
  },
  {
    accessorKey: 'thanksLetterSent',
    header: '感谢信',
    cell: ({ row }) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${row.original.thanksLetterSent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
      >
        {row.original.thanksLetterSent ? '已发送' : '未发送'}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DonationActions
        row={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];