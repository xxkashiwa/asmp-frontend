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
import { Alumni } from '@/models/alumni';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getAlumniColumns } from './alumni-columns';
import { AlumniDialog } from './alumni-dialog';

interface AlumniTableProps {
  data: Alumni[];
  onAddAlumni: (data: Alumni) => Promise<void>;
  onEditAlumni: (id: string, data: Alumni) => Promise<void>;
  onDeleteAlumni: (id: string) => Promise<void>;
}

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  studentId: '学号',
  realName: '姓名',
  gender: '性别',
  dateOfBirth: '生日',
  address: '地址',
  companyName: '公司名',
  currentJob: '工作名',
  addedAt: '加入日期',
};

export function AlumniTable({
  data,
  onAddAlumni,
  onEditAlumni,
  onDeleteAlumni,
}: AlumniTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [alumniToEdit, setAlumniToEdit] = useState<Alumni | undefined>(
    undefined
  );
  const [alumniToDelete, setAlumniToDelete] = useState<Alumni | undefined>(
    undefined
  );

  const handleEdit = (alumni: Alumni) => {
    setAlumniToEdit(alumni);
  };

  const handleDelete = (alumni: Alumni) => {
    setAlumniToDelete(alumni);
  };
  const handleEditSubmit = async (formData: Alumni) => {
    if (alumniToEdit) {
      await onEditAlumni(alumniToEdit.studentId, formData);
      setAlumniToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (alumniToDelete) {
      await onDeleteAlumni(alumniToDelete.studentId);
      setAlumniToDelete(undefined);
    }
  };

  const columns = getAlumniColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpenAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加校友
        </Button>
      </div>{' '}
      <DataTable
        tableId="alumni-table"
        columns={columns}
        data={data}
        searchKeys={['realName', 'studentId', 'companyName', 'currentJob']}
        searchLabel="搜索校友"
        searchFieldLabels={searchFieldLabels}
      />
      {/* 添加校友对话框 */}
      <AlumniDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddAlumni}
        title="添加校友"
        description="填写校友信息，带 * 的字段为必填项。"
      />
      {/* 编辑校友对话框 */}
      <AlumniDialog
        isOpen={!!alumniToEdit}
        onClose={() => setAlumniToEdit(undefined)}
        onSubmit={handleEditSubmit}
        alumni={alumniToEdit}
        title="编辑校友"
        description="修改校友信息，带 * 的字段为必填项。"
      />
      {/* 删除确认对话框 */}
      <AlertDialog
        open={!!alumniToDelete}
        onOpenChange={open => !open && setAlumniToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            {' '}
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除 {alumniToDelete?.realName} (
              {alumniToDelete?.studentId}) 的记录吗？此操作无法撤销。
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
