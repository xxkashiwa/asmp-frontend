import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/data-table';
import { Donation } from '@/types';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getDonationColumns } from './donation-columns';
import { DonationDialog } from './donation-dialog';

interface DonationTableProps {
  data: Donation[];
  onAddDonation: (data: Omit<Donation, 'id'>) => Promise<void>;
  onEditDonation: (id: number, data: Omit<Donation, 'id'>) => Promise<void>;
  onDeleteDonation: (id: number) => Promise<void>;
}

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  donorName: '捐赠人',
  projectName: '项目名称',
};

export function DonationTable({
  data,
  onAddDonation,
  onEditDonation,
  onDeleteDonation,
}: DonationTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [donationToEdit, setDonationToEdit] = useState<Donation | undefined>(
    undefined
  );
  const [donationToDelete, setDonationToDelete] = useState<Donation | undefined>(
    undefined
  );

  const handleEdit = (donation: Donation) => {
    setDonationToEdit(donation);
  };

  const handleDelete = (donation: Donation) => {
    setDonationToDelete(donation);
  };

  const handleEditSubmit = async (formData: Omit<Donation, 'id'>) => {
    if (donationToEdit) {
      await onEditDonation(donationToEdit.id, formData);
      setDonationToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (donationToDelete) {
      await onDeleteDonation(donationToDelete.id);
      setDonationToDelete(undefined);
    }
  };

  const columns = getDonationColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpenAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加捐赠记录
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKeys={['donorName', 'projectName',  ]}
        searchLabel="搜索捐赠记录"
        searchFieldLabels={searchFieldLabels}
      />

      {/* 添加捐赠记录对话框 */}
      <DonationDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddDonation}
        title="添加捐赠记录"
        description="添加捐赠记录，带 * 的字段为必填项。"
      />
      {/* 编辑捐赠记录对话框 */}
      <DonationDialog
        isOpen={!!donationToEdit}
        onClose={() => setDonationToEdit(undefined)}
        onSubmit={handleEditSubmit}
        donation={donationToEdit}
        title="编辑捐赠记录"
        description="修改捐赠记录信息，带 * 的字段为必填项。"
      />

      {/* 删除确认对话框 */}
      <AlertDialog
        open={!!donationToDelete}
        onOpenChange={open => !open && setDonationToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除 {donationToDelete?.donorName} 的捐赠记录吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}