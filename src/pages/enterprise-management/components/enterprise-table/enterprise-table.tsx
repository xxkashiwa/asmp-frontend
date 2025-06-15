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

interface EnterpriseTableProps {
  data: Enterprise[];
  onAddEnterprise: (data: Enterprise) => Promise<void>;
  onEditEnterprise: (id: string, data: Enterprise) => Promise<void>;
  onDeleteEnterprise: (id: string) => Promise<void>;
}

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  name: '名字',
  field: '领域',
  address: '地址',
  contactPerson: '联系人',
  addedAt: '加入日期',
  contactEmail: '联系邮箱',
  contactPhone: '联系电话',
};

export function EnterpriseTable({
  data,
  onAddEnterprise,
  onEditEnterprise,
  onDeleteEnterprise,
}: EnterpriseTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [enterpriseToEdit, setEnterpriseToEdit] = useState<
    Enterprise | undefined
  >(undefined);
  const [enterpriseToDelete, setEnterpriseToDelete] = useState<
    Enterprise | undefined
  >(undefined);

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
        searchKeys={['name', 'field', 'contactPerson']}
        searchLabel="搜索企业"
        searchFieldLabels={searchFieldLabels}
      />
      {/* 添加企业对话框 */}
      <EnterpriseDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddEnterprise}
        title="添加企业"
        description="填写企业信息，带 * 的字段为必填项。"
      />
      {/* 编辑企业对话框 */}
      <EnterpriseDialog
        isOpen={!!enterpriseToEdit}
        onClose={() => setEnterpriseToEdit(undefined)}
        onSubmit={handleEditSubmit}
        initialData={enterpriseToEdit}
        title="编辑企业"
        description="编辑企业信息，带 * 的字段为必填项。"
      />
      {/* 删除确认对话框 */}
      <AlertDialog
        open={!!enterpriseToDelete}
        onOpenChange={() => setEnterpriseToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除企业 {enterpriseToDelete?.name} 吗？此操作不可撤销。
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
