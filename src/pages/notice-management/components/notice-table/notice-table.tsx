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
import { Notice } from '@/models/notice';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getNoticeColumns } from './notice-columns';
import { NoticeDialog } from './notice-dialog';

interface NoticeTableProps {
  data: Notice[];
  onAddNotice: (data: Notice) => Promise<void>;
  onEditNotice: (id: string, data: Notice) => Promise<void>;
  onDeleteNotice: (id: string) => Promise<void>;
}

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  title: '标题',
  content: '内容',
  type: '类型',
};

export default function NoticeTable({
  data,
  onAddNotice,
  onEditNotice,
  onDeleteNotice,
}: NoticeTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState<Notice | undefined>(
    undefined
  );
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | undefined>(
    undefined
  );

  const handleEdit = (notice: Notice) => {
    setNoticeToEdit(notice);
  };

  const handleDelete = (notice: Notice) => {
    setNoticeToDelete(notice);
  };

  const handleEditSubmit = async (formData: Notice) => {
    if (noticeToEdit) {
      await onEditNotice(noticeToEdit.id, formData);
      setNoticeToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (noticeToDelete) {
      await onDeleteNotice(noticeToDelete.id);
      setNoticeToDelete(undefined);
    }
  };

  const columns = getNoticeColumns(handleEdit, handleDelete);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">通知管理</h2>
        <Button
          onClick={() => setOpenAddDialog(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>添加通知</span>
        </Button>
      </div>{' '}
      <DataTable<Notice, keyof Notice>
        tableId="notice-table"
        columns={columns}
        data={data}
        searchKey="title"
        searchFieldLabels={searchFieldLabels}
      />
      <NoticeDialog
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        onSubmit={onAddNotice}
        mode="add"
      />
      {noticeToEdit && (
        <NoticeDialog
          open={!!noticeToEdit}
          setOpen={() => setNoticeToEdit(undefined)}
          onSubmit={handleEditSubmit}
          initialData={noticeToEdit}
          mode="edit"
        />
      )}
      <AlertDialog
        open={!!noticeToDelete}
        onOpenChange={() => setNoticeToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              你确定要删除这条通知吗？这个操作不能撤销。
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
