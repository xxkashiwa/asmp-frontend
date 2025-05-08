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
import { Partnership } from '@/types';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getPartnershipColumns } from './partnership-columns';
import { PartnershipDialog } from './partnership-dialog';

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  name: '合作伙伴名称',
  type: '合作类型',
  contact: '联系人',
  phone: '联系电话',
  email: '电子邮箱',
  status: '状态',
};

interface PartnershipTableProps {
  data: Partnership[];
  onAddPartnership: (data: Omit<Partnership, 'id'>) => Promise<void>;
  onEditPartnership: (id: number, data: Omit<Partnership, 'id'>) => Promise<void>;
  onDeletePartnership: (id: number) => Promise<void>;
}

export function PartnershipTable({
  data,
  onAddPartnership,
  onEditPartnership,
  onDeletePartnership,
}: PartnershipTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [partnershipToEdit, setPartnershipToEdit] = useState<Partnership | undefined>(undefined);
  const [partnershipToDelete, setPartnershipToDelete] = useState<Partnership | undefined>(undefined);

  const handleEdit = (partnership: Partnership) => {
    setPartnershipToEdit(partnership);
  };

  const handleDelete = (partnership: Partnership) => {
    setPartnershipToDelete(partnership);
  };

  const handleEditSubmit = async (formData: Omit<Partnership, 'id'>) => {
    if (partnershipToEdit) {
      await onEditPartnership(partnershipToEdit.id, formData);
      setPartnershipToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (partnershipToDelete) {
      await onDeletePartnership(partnershipToDelete.id);
      setPartnershipToDelete(undefined);
    }
  };

  const columns = getPartnershipColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpenAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加合作伙伴
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKeys={['name', 'type', 'contact', 'status']}
        searchLabel="搜索合作伙伴"
        searchFieldLabels={searchFieldLabels}
      />

      <PartnershipDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddPartnership}
        title="添加合作伙伴"
        description="请填写合作伙伴信息"
      />

      <PartnershipDialog
        isOpen={!!partnershipToEdit}
        onClose={() => setPartnershipToEdit(undefined)}
        onSubmit={handleEditSubmit}
        partnership={partnershipToEdit}
        title="编辑合作伙伴"
        description="请修改合作伙伴信息，带 * 的字段为必填项。"
      />

      <AlertDialog
        open={!!partnershipToDelete}
        onOpenChange={open => !open && setPartnershipToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除 {partnershipToDelete?.name} 的合作伙伴记录吗？此操作无法撤销。
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