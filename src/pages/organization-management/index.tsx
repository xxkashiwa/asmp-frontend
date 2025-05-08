import { OrganizationTable } from '@/pages/organization-management/components/organization-table/organization-table';
import { Organization } from '@/types';
import { useState } from 'react';
import { mockOrganizationData } from './mock-data';


const OrganizationManagement: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizationData);

  const handleAddOrganization = async (data: Omit<Organization, 'id'>) => {
    const newOrganization: Organization = {
      ...data,
      id: organizations.length + 1,
    };
    setOrganizations(prev => [...prev, newOrganization]);
  };

  const handleEditOrganization = async (id: number, data: Omit<Organization, 'id'>) => {
    setOrganizations(prev =>
      prev.map(org => (org.id === id ? { ...org, ...data } : org)),
    );
  };

  const handleDeleteOrganization = async (id: number) => {
    setOrganizations(prev => prev.filter(org => org.id !== id));
  };

  return (
    <div className="w-full">
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
