import { Activity } from '@/models/activity';
import useActivityStore from '@/stores/activity-store';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { EventTable } from './components/event-table/event-table';

const ActivityManagement: React.FC = () => {
  const { activities, fetchActivities } = useActivityStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 组件挂载时从 store 获取数据
    setLoading(true);
    fetchActivities()
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        toast.error('获取活动数据失败', { description: error.message });
      });
  }, [fetchActivities]);

  const handleAddEvent = async (data: Omit<Activity, 'id'>): Promise<void> => {
    // 这里应该调用实际的API服务
    toast.success('添加活动成功（模拟）');
    // 重新获取列表数据
    await fetchActivities();
  };

  const handleEditEvent = async (
    id: string,
    data: Omit<Activity, 'id'>
  ): Promise<void> => {
    // 这里应该调用实际的API服务
    toast.success(`编辑活动成功（模拟）: ${id}`);
    // 重新获取列表数据
    await fetchActivities();
  };

  const handleDeleteEvent = async (id: string): Promise<void> => {
    // 这里应该调用实际的API服务
    toast.success(`删除活动成功（模拟）: ${id}`);
    // 重新获取列表数据
    await fetchActivities();
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">活动管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友活动、聚会、讲座、研讨会等内容
        </p>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p>加载中...</p>
          </div>
        ) : (
          <EventTable
            data={activities}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
      </div>
    </div>
  );
};

export default ActivityManagement;
