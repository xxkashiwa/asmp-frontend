import useDonationsStore from '@/stores/donations-store';
import { useEffect } from 'react';
import { toast } from 'sonner';

const DonationsManagement: React.FC = () => {
  const { donationsList, fetchDonationsList } = useDonationsStore();
  useEffect(()=>{
    fetchDonationsList().catch(error => {
      console.error('Failed to fetch donation data', error);
      toast.error('获取捐赠数据失败');
    });
  },[fetchDonationsList]);
  console.log('Donation List: ',donationsList);
    return (
      <div className="w-full overflow-auto">
        <h1 className="mb-6 text-2xl font-bold">捐赠管理</h1>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="mb-4 text-gray-600">
            管理捐赠记录
          </p>
        </div>
      </div>
    );
};

export default DonationsManagement;