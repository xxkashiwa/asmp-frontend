import { PartnershipTable } from '@/pages/partnership-management/components/partnership-table/partnership-table';
import usePartnershipStore from '@/stores/partnership-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const PartnershipManagement: React.FC = () => {
  // 使用 Zustand store 代替局部状态
  const {
    partnershipList,
    loading,
    fetchPartnershipList,
    addPartnership,
    updatePartnership,
    deletePartnership,
  } = usePartnershipStore();

  useEffect(() => {
    // 组件挂载时从 store 获取数据
    fetchPartnershipList().catch(error => {
      console.error('Failed to fetch partnership data', error);
      toast.error('获取合作伙伴数据失败');
    });
  }, [fetchPartnershipList]);

  const handleAddPartnership = async (data: Omit<(typeof partnershipList)[0], 'id'>) => {
    try {
      await addPartnership(data);
      toast.success('添加合作伙伴成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add partnership', error);
      toast.error('添加合作伙伴失败');
      return Promise.reject(error);
    }
  };

  const handleEditPartnership = async (
    id: number,
    data: Omit<(typeof partnershipList)[0], 'id'>
  ) => {
    try {
      await updatePartnership(id, data);
      toast.success('更新合作伙伴信息成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update partnership', error);
      toast.error('更新合作伙伴信息失败');
      return Promise.reject(error);
    }
  };

  const handleDeletePartnership = async (id: number) => {
    try {
      await deletePartnership(id);
      toast.success('删除合作伙伴成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete partnership', error);
      toast.error('删除合作伙伴失败');
      return Promise.reject(error);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">合作伙伴管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校企合作、资源共享、项目对接等内容
        </p>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p>加载中...</p>
          </div>
        ) : (
          <PartnershipTable
            data={partnershipList}
            onAddPartnership={handleAddPartnership}
            onEditPartnership={handleEditPartnership}
            onDeletePartnership={handleDeletePartnership}
          />
        )}
      </div>
    </div>
  );
};

export default PartnershipManagement;
