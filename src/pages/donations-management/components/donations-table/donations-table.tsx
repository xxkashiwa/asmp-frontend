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
import { Donations } from '@/models/donations';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getDonationColumns } from './donations-columns';
import { DonationDialog } from './donations-dialog';

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  name: '项目名称',
  description: '描述',
};

interface DonationsTableProps {
  data: Donations[];
  onAddDonation: (data: Donations) => Promise<void>;
  onEditDonation: (id: string, data: Donations) => Promise<void>;
  onDeleteDonation: (id: string) => Promise<void>;
}

export function DonationTable({
  data,
  onAddDonation,
  onEditDonation,
  onDeleteDonation,
}: DonationsTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [donationToEdit, setDonationToEdit] = useState<Donations | undefined>(
    undefined
  );
  const [donationToDelete, setDonationToDelete] = useState<Donations | undefined>(
    undefined
  );

  const handleEdit = (donation: Donations) => {
    setDonationToEdit(donation);
  };

  const handleDelete = (donation: Donations) => {
    setDonationToDelete(donation);
  };

  const handleEditSubmit = async (formData: Donations) => {
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
          添加捐赠项目
        </Button>
      </div>

      <DataTable
        tableId="donation-table"
        columns={columns}
        data={data}
        searchKeys={['name', 'description']}
        searchLabel="搜索捐赠项目"
        searchFieldLabels={searchFieldLabels}
      />

      {/* 添加捐赠记录对话框 */}
      <DonationDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddDonation}
        title="添加捐赠项目"
        description="添加捐赠项目，带 * 的字段为必填项。"
      />
      {/* 编辑捐赠记录对话框 */}
      <DonationDialog
        isOpen={!!donationToEdit}
        onClose={() => setDonationToEdit(undefined)}
        onSubmit={handleEditSubmit}
        donation={donationToEdit}
        title="编辑捐赠项目"
        description="修改捐赠项目信息，带 * 的字段为必填项。"
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
              您确定要删除 {donationToDelete?.name} 的捐赠项目吗？此操作无法撤销。
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