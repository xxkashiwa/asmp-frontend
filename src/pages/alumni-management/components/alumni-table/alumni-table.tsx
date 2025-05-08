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
import { Alumni } from '@/types';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getAlumniColumns } from './alumni-columns';
import { AlumniDialog } from './alumni-dialog';

interface AlumniTableProps {
  data: Alumni[];
  onAddAlumni: (data: Omit<Alumni, 'id'>) => Promise<void>;
  onEditAlumni: (id: number, data: Omit<Alumni, 'id'>) => Promise<void>;
  onDeleteAlumni: (id: number) => Promise<void>;
}

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  id: 'ID',
  name: '姓名',
  studentId: '学号',
  gender: '性别',
  school: '学院',
  major: '专业',
  graduationYear: '毕业年份',
  degree: '学位',
  currentCompany: '当前公司',
  jobPosition: '职位',
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

  const handleEditSubmit = async (formData: Omit<Alumni, 'id'>) => {
    if (alumniToEdit) {
      await onEditAlumni(alumniToEdit.id, formData);
      setAlumniToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (alumniToDelete) {
      await onDeleteAlumni(alumniToDelete.id);
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
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKeys={['name', 'studentId', 'school', 'major', 'graduationYear']}
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
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除 {alumniToDelete?.name} ({alumniToDelete?.studentId})
              的记录吗？此操作无法撤销。
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
