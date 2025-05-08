import { DonationTable } from '@/pages/donation-management/components/donation-table/donation-table';
import useDonationStore from '@/stores/donation-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const DonationManagement: React.FC = () => {
  const {
    donationList,
    loading,
    fetchDonationList,
    addDonation,
    updateDonation,
    deleteDonation,
  } = useDonationStore();

  useEffect(() => {
    // 组件挂载时从 store 获取数据
    fetchDonationList().catch(error => {
      console.error('Failed to fetch donation data', error);
      toast.error('获取捐赠数据失败');
    });
  }, [fetchDonationList]);

  const handleAddDonation = async (data: Omit<(typeof donationList)[0], 'id'>) => {
    try {
      await addDonation(data);
      toast.success('添加捐赠记录成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add donation', error);
      toast.error('添加捐赠记录失败');
      return Promise.reject(error);
    }
  };

  const handleEditDonation = async (
    id: number,
    data: Omit<(typeof donationList)[0], 'id'>
  ) => {
    try {
      await updateDonation(id, data);
      toast.success('更新捐赠记录成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update donation', error);
      toast.error('更新捐赠记录失败');
      return Promise.reject(error);
    }
  };

  const handleDeleteDonation = async (id: number) => {
    try {
      await deleteDonation(id);
      toast.success('删除捐赠记录成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete donation', error);
      toast.error('删除捐赠记录失败');
      return Promise.reject(error);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">捐赠管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友捐赠记录、项目资金、感谢报告等内容
        </p>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p>加载中...</p>
          </div>
        ) : (
          <DonationTable
            data={donationList}
            onAddDonation={handleAddDonation}
            onEditDonation={handleEditDonation}
            onDeleteDonation={handleDeleteDonation}
          />
        )}
      </div>
    </div>
  );
};

export default DonationManagement;