import { Organization } from '@/models/organization';
import useOrganizationStore from '@/stores/organization-store';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { OrganizationTable } from './components/organization-table/organization-table';

const OrganizationManagement: React.FC = () => {
  const {
    organizations,
    fetchOrganizations,
    addOrganization,
    updateOrganization,
    deleteOrganization,
  } = useOrganizationStore();

  // 使用 useEffect 在组件挂载时获取组织数据
  useEffect(() => {
    if (organizations.length > 0) {
      return; // 如果组织数据已经存在，则不再请求
    }
    fetchOrganizations().catch(error => {
      console.error('获取组织数据失败', error);
      toast.error('获取组织数据失败，请稍后重试');
    });
  }, [organizations.length, fetchOrganizations]);

  const handleAddOrganization = async (data: Organization): Promise<void> => {
    try {
      // 调用store中的添加方法
      addOrganization(data);
      toast.success('添加组织成功');
    } catch (error) {
      console.error('添加组织失败', error);
      toast.error('添加组织失败');
    }
  };

  const handleEditOrganization = async (
    id: string,
    data: Organization
  ): Promise<void> => {
    try {
      // 调用store中的更新方法
      updateOrganization(id, data);
      toast.success('更新组织信息成功');
    } catch (error) {
      console.error('更新组织失败', error);
      toast.error('更新组织信息失败');
    }
  };

  const handleDeleteOrganization = async (id: string): Promise<void> => {
    try {
      // 调用store中的删除方法
      deleteOrganization(id);
      toast.success('删除组织成功');
    } catch (error) {
      console.error('删除组织失败', error);
      toast.error('删除组织失败');
    }
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
