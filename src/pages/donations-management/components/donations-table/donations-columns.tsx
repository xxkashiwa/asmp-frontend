
import { Donations } from '@/models/donations';
import { ColumnDef } from '@tanstack/react-table';
import { DonationActions } from './donations-actions';

export function getDonationColumns(
  onEdit: (donation: Donations) => void,
  onDelete: (donation: Donations) => void
): ColumnDef<Donations>[] {
  return [
    {
      accessorKey: 'name',
      header: '项目名称',
    },
    {
      accessorKey: 'description',
      header: '描述',
      cell: ({ row }) => {
        const description = row.getValue('description') as string;
        return description.length > 50 ? `${description.slice(0, 50)}...` : description;
      },
    },
    {
      accessorKey: 'targetAmount',
      header: '目标金额',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('targetAmount'));
        return new Intl.NumberFormat('zh-CN', {
          style: 'currency',
          currency: 'CNY',
        }).format(amount);
      },
    },
    {
      accessorKey: 'currentAmount',
      header: '当前金额',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('currentAmount'));
        return new Intl.NumberFormat('zh-CN', {
          style: 'currency',
          currency: 'CNY',
        }).format(amount);
      },
    },
    {
      accessorKey: 'status',
      header: '状态',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        let className = '';
        let statusText = '';

        switch (status) {
          case 'PENDING':
            className = 'bg-blue-100 text-blue-800';
            statusText = '待处理';
            break;
          case 'CONFIRMED':
            className = 'bg-amber-100 text-amber-800';
            statusText = '已确认';
            break;
          case 'COMPLETED':
            className = 'bg-green-100 text-green-800';
            statusText = '已完成';
            break;
          case 'CANCELED':
            className = 'bg-red-100 text-red-800';
            statusText = '已取消';
            break;
          case 'REFUNDED':
            className = 'bg-gray-100 text-gray-800';
            statusText = '已退款';
            break;
          default:
            className = 'bg-gray-100 text-gray-800';
            statusText = status;
        }

        return (
          <span
            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${className}`}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      accessorKey: 'targetReached',
      header: '目标达成',
      cell: ({ row }) => {
        const targetReached = row.getValue('targetReached') as boolean;
        return targetReached ? '是' : '否';
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const donation = row.original;
        return (
          <DonationActions
            donation={donation}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      },
    },
  ];
}