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
import { getActivityColumns } from './activity-columns';
import { ActivityDialog } from './activity-dialog';

interface ActivityTableProps {
  data: Activity[];
  onAddActivity: (data: Activity) => Promise<void>;
  onEditActivity: (id: string, data: Activity) => Promise<void>;
  onDeleteActivity: (id: string) => Promise<void>;
}

// 搜索字段的中文映射
const searchFieldLabels: Record<string, string> = {
  title: '活动标题',
  location: '活动地点',
  startTime: '开始时间',
  endTime: '结束时间',
  description: '活动简介',
  maxParticipants: '最大参与人数',
  'organizer.name': '组织者',
  status: '活动状态',
};

export function ActivityTable({
  data,
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
}: ActivityTableProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<Activity | undefined>(
    undefined
  );
  const [activityToDelete, setActivityToDelete] = useState<
    Activity | undefined
  >(undefined);

  const handleEdit = (activity: Activity) => {
    setActivityToEdit(activity);
  };

  const handleDelete = (activity: Activity) => {
    setActivityToDelete(activity);
  };

  const handleEditSubmit = async (formData: Activity) => {
    if (activityToEdit) {
      await onEditActivity(activityToEdit.id, formData);
      setActivityToEdit(undefined);
    }
  };

  const handleDeleteConfirm = async () => {
    if (activityToDelete) {
      await onDeleteActivity(activityToDelete.id);
      setActivityToDelete(undefined);
    }
  };

  const columns = getActivityColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpenAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加活动
        </Button>
      </div>
      <DataTable
        tableId="activity-table"
        columns={columns}
        data={data}
        searchKeys={['title', 'location', 'description', 'organizer.name']}
        searchLabel="搜索活动"
        searchFieldLabels={searchFieldLabels}
      />
      {/* 添加活动对话框 */}
      <ActivityDialog
        isOpen={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={onAddActivity}
        title="添加活动"
        description="填写活动信息，带 * 的字段为必填项。"
      />
      {/* 编辑活动对话框 */}
      <ActivityDialog
        isOpen={!!activityToEdit}
        onClose={() => setActivityToEdit(undefined)}
        onSubmit={handleEditSubmit}
        activity={activityToEdit}
        title="编辑活动"
        description="修改活动信息，带 * 的字段为必填项。"
      />
      {/* 删除确认对话框 */}
      <AlertDialog
        open={!!activityToDelete}
        onOpenChange={open => !open && setActivityToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除"
              {activityToDelete?.title}"活动吗？此操作无法撤销。
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
