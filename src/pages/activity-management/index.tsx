import { Activity } from '@/models/activity';
import useActivityStore from '@/stores/activity-store';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ActivityTable } from './components/activity-table/activity-table';

const ActivityManagement: React.FC = () => {
  const {
    activities,
    fetchActivities,
    addActivity,
    updateActivity,
    deleteActivity,
  } = useActivityStore();

  const [localActivities, setLocalActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // 尝试从API获取数据
    if (activities.length > 0) {
      return;
    }
    fetchActivities().catch(error => {
      console.error('获取活动数据失败，请稍后重试', error);
      toast.error('获取活动数据失败，请稍后重试');
    });
  }, [fetchActivities, activities.length]);

  // 将store中的数据更新到本地状态
  useEffect(() => {
    setLocalActivities(activities);
  }, [activities]);
  const handleAddActivity = async (data: Activity) => {
    try {
      // 这里可以调用API添加活动，然后更新状态
      // 目前使用前端状态管理
      addActivity(data);
      setLocalActivities(prev => [...prev, data]);
      toast.success('活动添加成功');
    } catch (error) {
      console.error('添加活动失败', error);
      toast.error('添加活动失败');
    }
  };
  const handleEditActivity = async (_id: string, data: Activity) => {
    try {
      // 这里可以调用API修改活动，然后更新状态
      // 目前使用前端状态管理
      updateActivity(data);
      setLocalActivities(prev =>
        prev.map(activity => (activity.id === data.id ? data : activity))
      );
      toast.success('活动更新成功');
    } catch (error) {
      console.error('更新活动失败', error);
      toast.error('更新活动失败');
    }
  };
  const handleDeleteActivity = async (id: string) => {
    try {
      // 这里可以调用API删除活动，然后更新状态
      // 目前使用前端状态管理
      deleteActivity(id);
      setLocalActivities(prev => prev.filter(activity => activity.id !== id));
      toast.success('活动删除成功');
    } catch (error) {
      console.error('删除活动失败', error);
      toast.error('删除活动失败');
    }
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">活动管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友活动、聚会、讲座、研讨会等内容
        </p>
        <ActivityTable
          data={localActivities}
          onAddActivity={handleAddActivity}
          onEditActivity={handleEditActivity}
          onDeleteActivity={handleDeleteActivity}
        />
      </div>
    </div>
  );
};

export default ActivityManagement;
