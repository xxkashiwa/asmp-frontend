/* eslint-disable @typescript-eslint/no-unused-vars */
import { Donations } from '@/models/donations';
import useDonationsStore from '@/stores/donations-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { DonationTable } from './components/donations-table/donations-table';
import { Donation } from '@/types';

const DonationsManagement: React.FC = () => {
  const { donationsList, fetchDonationsList } = useDonationsStore();
  useEffect(() => {
    fetchDonationsList().catch(error => {
      console.error('Failed to fetch donations data', error);
      toast.error('获取捐赠数据失败');
    });
  }, [fetchDonationsList]);
  
  const handleAddDonation = async (data: Donations): Promise<void> => {
    try {
      toast.success('添加捐赠成功');
    } catch (error) {
      console.error('Failed to add donation', error);
      toast.error('添加捐赠失败');
    }
  };

  const handleEditDonation = async (
    id: number,
    data: Donations
  ): Promise<void> => {
    try {
      toast.success('更新捐赠信息成功');
    } catch (error) {
      console.error('Failed to update donation', error);
      toast.error('更新捐赠信息失败');
    }
  };
  
  const handleDeleteDonation = async (id: number): Promise<void> => {
    try {
      toast.success('删除捐赠成功');
    } catch (error) {
      console.error('Failed to delete donation', error);
      toast.error('删除捐赠失败');
    }
  };
    return (
      <div className="w-full overflow-auto">
        <h1 className="mb-6 text-2xl font-bold">捐赠管理</h1>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="mb-4 text-gray-600">
            管理校友捐赠记录，包括捐赠项目、捐赠金额、捐赠时间等信息
          </p>

          {donationsList.length === 0 ? (
            ''
          ) : (
            <DonationTable
              data={donationsList}
              onAddDonation={handleAddDonation}
              onEditDonation={handleEditDonation}
              onDeleteDonation={handleDeleteDonation}
            />
          )}
        </div>
      </div>
    );
  };

export default DonationsManagement;