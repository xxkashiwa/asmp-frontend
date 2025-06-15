import { Enterprise } from '@/models/enterprise';
import useEnterpriseStore from '@/stores/enterprise-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { EnterpriseTable } from './components/enterprise-table/enterprise-table';

const EnterpriseManagement: React.FC = () => {
  const {
    enterpriseList,
    fetchEnterpriseList,
    addEnterprise,
    updateEnterprise,
    deleteEnterprise,
  } = useEnterpriseStore();

  useEffect(() => {
    if (enterpriseList.length > 0) {
      return; // 如果企业数据已经存在，则不再请求
    }
    fetchEnterpriseList().catch(error => {
      console.error('Failed to fetch enterprise data', error);
      toast.error('获取合作伙伴数据失败');
    });
  }, [fetchEnterpriseList, enterpriseList.length]);

  const handleAddEnterprise = async (data: Enterprise): Promise<void> => {
    try {
      addEnterprise(data);
      toast.success('添加企业成功');
    } catch (error) {
      console.error('Failed to add enterprise', error);
      toast.error('添加企业失败');
    }
  };

  const handleEditEnterprise = async (
    id: string,
    data: Enterprise
  ): Promise<void> => {
    try {
      updateEnterprise({ ...data, id });
      toast.success('更新企业信息成功');
    } catch (error) {
      console.error('Failed to update enterprise', error);
      toast.error('更新企业信息失败');
    }
  };

  const handleDeleteEnterprise = async (id: string): Promise<void> => {
    try {
      deleteEnterprise(id);
      toast.success('删除企业成功');
    } catch (error) {
      console.error('Failed to delete enterprise', error);
      toast.error('删除企业失败');
    }
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">企业管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理企业信息、合作伙伴、联系方式等内容
        </p>

        {enterpriseList.length === 0 ? (
          ''
        ) : (
          <EnterpriseTable
            data={enterpriseList}
            onAddEnterprise={handleAddEnterprise}
            onEditEnterprise={handleEditEnterprise}
            onDeleteEnterprise={handleDeleteEnterprise}
          />
        )}
      </div>
    </div>
  );
};

export default EnterpriseManagement;
