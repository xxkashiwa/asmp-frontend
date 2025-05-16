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
import { Organization } from '@/types';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getOrganizationColumns } from './organization-columns';
import { OrganizationDialog } from './organization-dialog';

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  name: '组织名称',
  location: '地点',
  leader: '负责人'
};

interface OrganizationTableProps {
  data: Organization[];
  onAddOrganization: (data: Omit<Organization, 'id'>) => Promise<void>;
  onEditOrganization: (id: number, data: Omit<Organization, 'id'>) => Promise<void>;
  onDeleteOrganization: (id: number) => Promise<void>;
}

export function OrganizationTable({
  data,
  onAddOrganization,
  onEditOrganization,
  onDeleteOrganization,
}: OrganizationTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [organizationToEdit, setOrganizationToEdit] = useState<Organization | undefined>(undefined);
  const [organizationToDelete, setOrganizationToDelete] = useState<Organization | undefined>(undefined);

  const handleEdit = (organization: Organization) => {
    setOrganizationToEdit(organization);
  };

  const handleDelete = (organization: Organization) => {
    setOrganizationToDelete(organization);
  };

  const handleEditSubmit = async (formData: Omit<Organization, 'id'>) => {
    if (organizationToEdit) {
      await onEditOrganization(organizationToEdit.id, formData);
      setOrganizationToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (organizationToDelete) {
      await onDeleteOrganization(organizationToDelete.id);
      setOrganizationToDelete(undefined);
    }
  };

  const columns = getOrganizationColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpenAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加组织
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKeys={['name', 'location',  'leader']}
        searchLabel="搜索组织"
        searchFieldLabels={searchFieldLabels}
      />

      <OrganizationDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddOrganization}
        title="添加组织"
        description="请填写组织信息"
      />

      <OrganizationDialog
        isOpen={!!organizationToEdit}
        onClose={() => setOrganizationToEdit(undefined)}
        onSubmit={handleEditSubmit}
        organization={organizationToEdit}
        title="编辑组织"
        description="修改组织信息，带 * 的字段为必填项。"
      />

      <AlertDialog
        open={!!organizationToDelete}
        onOpenChange={open => !open && setOrganizationToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除 {organizationToDelete?.name} 的组织记录吗？此操作无法撤销。
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