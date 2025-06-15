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
import { Activity } from '@/models/activity';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getEventColumns } from './event-columns';
import { EventDialog } from './event-dialog';

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  title: '活动标题',
  location: '地点',
  'organizer.name': '组织者',
};

interface EventTableProps {
  data: Activity[];
  onAddEvent: (data: Omit<Activity, 'id'>) => Promise<void>;
  onEditEvent: (id: string, data: Omit<Activity, 'id'>) => Promise<void>;
  onDeleteEvent: (id: string) => Promise<void>;
}

export function EventTable({
  data,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}: EventTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Activity | undefined>(
    undefined
  );
  const [eventToDelete, setEventToDelete] = useState<Activity | undefined>(
    undefined
  );

  const handleEdit = (event: Activity) => {
    setEventToEdit(event);
  };

  const handleDelete = (event: Activity) => {
    setEventToDelete(event);
  };

  const handleEditSubmit = async (formData: Omit<Activity, 'id'>) => {
    if (eventToEdit) {
      await onEditEvent(eventToEdit.id, formData);
      setEventToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (eventToDelete) {
      await onDeleteEvent(eventToDelete.id);
      setEventToDelete(undefined);
    }
  };

  const columns = getEventColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpenAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加活动
        </Button>
      </div>

      <DataTable
        tableId="event-table"
        columns={columns}
        data={data}
        searchKeys={['title', 'location', 'organizer.name']}
        searchLabel="搜索活动"
        searchFieldLabels={searchFieldLabels}
      />

      {/* 添加活动对话框 */}
      <EventDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddEvent}
        title="添加活动"
        description="填写活动信息，带 * 的字段为必填项。"
      />

      {/* 编辑活动对话框 */}
      <EventDialog
        isOpen={!!eventToEdit}
        onClose={() => setEventToEdit(undefined)}
        onSubmit={handleEditSubmit}
        event={eventToEdit}
        title="编辑活动"
        description="修改活动信息，带 * 的字段为必填项。"
      />

      {/* 删除确认对话框 */}
      <AlertDialog
        open={!!eventToDelete}
        onOpenChange={open => !open && setEventToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除 {eventToDelete?.title} 的活动记录吗？此操作无法撤销。
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
