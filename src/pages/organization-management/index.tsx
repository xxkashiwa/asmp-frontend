import { Organization } from '@/models/organization';
import useOrganizationStore from '@/stores/organization-store';
import { useEffect } from 'react';
import { OrganizationTable } from './components/organization-table/organization-table';

const OrganizationManagement: React.FC = () => {
  const { organizations, fetchOrganizations } = useOrganizationStore();

  // 使用 useEffect 在组件挂载时获取组织数据
  useEffect(() => {
    fetchOrganizations().catch(error => {
      console.error('获取组织数据失败', error);
    });
  }, [fetchOrganizations]);

  const handleAddOrganization = async (data: Organization) => {
    // 实现添加组织的逻辑
    console.log('添加组织:', data);
  };

  const handleEditOrganization = async (id: string, data: Organization) => {
    // 实现编辑组织的逻辑
    console.log('编辑组织:', id, data);
  };

  const handleDeleteOrganization = async (id: string) => {
    // 实现删除组织的逻辑
    console.log('删除组织:', id);
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">组织管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友会组织架构、分会信息、管理人员等内容
        </p>

        <OrganizationTable
          data={organizations}
          onAddOrganization={handleAddOrganization}
          onEditOrganization={handleEditOrganization}
          onDeleteOrganization={handleDeleteOrganization}
        />
      </div>
    </div>
  );
};

export default OrganizationManagement;
