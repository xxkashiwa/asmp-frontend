import useEnterpriseStore from "@/stores/enterprise-service";
import { useEffect } from "react";
import { toast } from "sonner";
const EnterpriseManagement: React.FC = () => {
  const { enterpriseList, fetchEnterpriseList } = useEnterpriseStore();

  useEffect(() => {
    fetchEnterpriseList().catch(error => {
      console.error('Failed to fetch erterprise data', error);
      toast.error('获取合作伙伴数据失败');
    });
  }, [fetchEnterpriseList]);
  console.log('Enterprise List: ',enterpriseList);
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

export default EnterpriseManagement;