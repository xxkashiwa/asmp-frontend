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
import { Enterprise } from '@/models/enterprise';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getEnterpriseColumns } from './enterprise-columns';
import { EnterpriseDialog } from './enterprise-dialog';

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  name: '企业名称',
  contactPerson: '联系人',
};

interface EnterpriseTableProps {
  data: Enterprise[];
  onAddEnterprise: (data: Enterprise) => Promise<void>;
  onEditEnterprise: (id: string, data: Enterprise) => Promise<void>;
  onDeleteEnterprise: (id: string) => Promise<void>;
}

export function EnterpriseTable({
  data,
  onAddEnterprise,
  onEditEnterprise,
  onDeleteEnterprise,
}: EnterpriseTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [enterpriseToEdit, setEnterpriseToEdit] = useState<Enterprise | undefined>(undefined);
  const [enterpriseToDelete, setEnterpriseToDelete] = useState<Enterprise | undefined>(undefined);

  const handleEdit = (enterprise: Enterprise) => {
    setEnterpriseToEdit(enterprise);
  };

  const handleDelete = (enterprise: Enterprise) => {
    setEnterpriseToDelete(enterprise);
  };

  const handleEditSubmit = async (formData: Enterprise) => {
    if (enterpriseToEdit) {
      await onEditEnterprise(enterpriseToEdit.id, formData);
      setEnterpriseToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (enterpriseToDelete) {
      await onDeleteEnterprise(enterpriseToDelete.id);
      setEnterpriseToDelete(undefined);
    }
  };

  const columns = getEnterpriseColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpenAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加企业
        </Button>
      </div>

      <DataTable
        tableId="enterprise-table"
        columns={columns}
        data={data}
        searchKeys={['name', 'contactPerson']}
        searchLabel="搜索企业"
        searchFieldLabels={searchFieldLabels}
      />

      <EnterpriseDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddEnterprise}
        title="添加企业"
        description="请填写企业信息"
      />

      <EnterpriseDialog
        isOpen={!!enterpriseToEdit}
        onClose={() => setEnterpriseToEdit(undefined)}
        onSubmit={handleEditSubmit}
        enterprise={enterpriseToEdit}
        title="编辑企业"
        description="请修改企业信息，带 * 的字段为必填项。"
      />

      <AlertDialog
        open={!!enterpriseToDelete}
        onOpenChange={open => !open && setEnterpriseToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除 {enterpriseToDelete?.name} 的企业记录吗？此操作无法撤销。
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