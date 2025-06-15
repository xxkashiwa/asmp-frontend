import { Donations } from '@/models/donations';
import { ColumnDef } from '@tanstack/react-table';
import { DonationsActions } from './donations-actions';

// 状态的中文映射
const statusLabels: Record<string, string> = {
  PENDING: '待处理',
  CONFIRMED: '已确认',
  CANCELED: '已取消',
  REFUNDED: '已退款',
  COMPLETED: '已完成',
};

export const getDonationsColumns = (
  onEditDonation: (donation: Donations) => void,
  onDeleteDonation: (donation: Donations) => void
): ColumnDef<Donations>[] => [
  {
    accessorKey: 'name',
    header: '名字',
  },
  {
    accessorKey: 'description',
    header: '描述',
    cell: ({ row }) => {
      const content = row.original.description;
      // 显示内容的前30个字符，如果内容长度超过30个字符则显示...
      return content.length > 30 ? `${content.substring(0, 30)}...` : content;
    },
  },
  {
    id: 'amountInfo',
    header: '目标金额/现金额',
    cell: ({ row }) => {
      const current = row.original.targetAmount.toLocaleString('zh-CN', {
        style: 'currency',
        currency: 'CNY',
      });
      const target = row.original.currentAmount.toLocaleString('zh-CN', {
        style: 'currency',
        currency: 'CNY',
      });
      return `${current} / ${target}`;
    },
  },
  {
    id: 'dateInfo',
    header: '开始时间/结束时间',
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate).toLocaleDateString(
        'zh-CN'
      );
      const endDate = row.original.endDate
        ? new Date(row.original.endDate).toLocaleDateString('zh-CN')
        : '无结束日期';
      return `${startDate} / ${endDate}`;
    },
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => statusLabels[row.original.status] || row.original.status,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DonationsActions
        row={row.original}
        onEdit={onEditDonation}
        onDelete={onDeleteDonation}
      />
    ),
  },
];
