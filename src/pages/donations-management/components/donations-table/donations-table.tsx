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
import { getDonationsColumns } from './donations-columns';
import { DonationsDialog } from './donations-dialog';

interface DonationsTableProps {
  data: Donations[];
  onAddDonation: (data: Donations) => Promise<void>;
  onEditDonation: (id: string, data: Donations) => Promise<void>;
  onDeleteDonation: (id: string) => Promise<void>;
}

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  name: '名字',
  description: '描述',
  status: '状态',
  category: '分类',
};

const DonationsTable = ({
  data,
  onAddDonation,
  onEditDonation,
  onDeleteDonation,
}: DonationsTableProps) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [donationToEdit, setDonationToEdit] = useState<Donations | undefined>(
    undefined
  );
  const [donationToDelete, setDonationToDelete] = useState<
    Donations | undefined
  >(undefined);

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

  const columns = getDonationsColumns(handleEdit, handleDelete);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">捐赠项目</h2>
        <Button
          onClick={() => setOpenAddDialog(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>添加捐赠项目</span>
        </Button>
      </div>

      <DataTable<Donations, keyof Donations>
        tableId="donations-table"
        columns={columns}
        data={data}
        searchKey="name"
        searchFieldLabels={searchFieldLabels}
      />

      <DonationsDialog
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        onSubmit={onAddDonation}
        mode="add"
      />

      {donationToEdit && (
        <DonationsDialog
          open={!!donationToEdit}
          setOpen={() => setDonationToEdit(undefined)}
          onSubmit={handleEditSubmit}
          initialData={donationToEdit}
          mode="edit"
        />
      )}

      <AlertDialog
        open={!!donationToDelete}
        onOpenChange={() => setDonationToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              你确定要删除这个捐赠项目吗？这个操作不能撤销。
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
};

export default DonationsTable;
