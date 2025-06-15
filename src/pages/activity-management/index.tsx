import useActivityStore from '@/stores/activity-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const ActivityManagement: React.FC = () => {
  // // 使用 Zustand store 代替局部状态
  // const {
  //   eventList,
  //   loading,
  //   fetchEventList,
  //   addEvent,
  //   updateEvent,
  //   deleteEvent,
  // } = useEventStore();

  // useEffect(() => {
  //   // 组件挂载时从 store 获取数据
  //   fetchEventList().catch(error => {
  //     console.error('Failed to fetch event data', error);
  //     toast.error('获取事件数据失败');
  //   });
  // }, [fetchEventList]);

  // const handleAddEvent = async (data: Omit<(typeof eventList)[0], 'id'>) => {
  //   try {
  //     await addEvent(data);
  //     toast.success('添加事件成功');
  //     return Promise.resolve();
  //   } catch (error) {
  //     console.error('Failed to add event', error);
  //     toast.error('添加事件失败');
  //     return Promise.reject(error);
  //   }
  // };

  // const handleEditEvent = async (
  //   id: number,
  //   data: Omit<(typeof eventList)[0], 'id'>
  // ) => {
  //   try {
  //     await updateEvent(id, data);
  //     toast.success('更新事件信息成功');
  //     return Promise.resolve();
  //   } catch (error) {
  //     console.error('Failed to update event', error);
  //     toast.error('更新事件信息失败');
  //     return Promise.reject(error);
  //   }
  // };

  // const handleDeleteEvent = async (id: number) => {
  //   try {
  //     await deleteEvent(id);
  //     toast.success('删除事件成功');
  //     return Promise.resolve();
  //   } catch (error) {
  //     console.error('Failed to delete event', error);
  //     toast.error('删除事件失败');
  //     return Promise.reject(error);
  //   }
  // };

  const { activities, fetchActivities } = useActivityStore();

  useEffect(() => {
    // 组件挂载时从 store 获取数据
    fetchActivities().catch(error => {
      toast.error('获取活动数据失败', { description: error.message }); // 如果使用了 toast 提示
    });
  }, [fetchActivities]);
  console.log('活动列表:', activities);

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">活动管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友活动、聚会、讲座、研讨会等内容
        </p>
        {/* {loading?(
            <div className="flex h-64 items-center justify-center">
              <p>加载中...</p>
            </div>
          ) : (
          <EventTable
            data={eventList}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />)} */}
      </div>
    </div>
  );
};

export default ActivityManagement;
