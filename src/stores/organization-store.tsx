import { mockOrganizationData } from '@/pages/organization-management/mock-data';
import { Organization } from '@/types';
import { create } from 'zustand';

interface OrganizationStore {
  organizationList: Organization[];
  loading: boolean;
  fetchOrganizationList: () => Promise<void>;
  addOrganization: (organization: Omit<Organization, 'id'>) => Promise<void>;
  updateOrganization: (
    id: number,
    updatedOrganization: Omit<Organization, 'id'>
  ) => Promise<void>;
  deleteOrganization: (id: number) => Promise<void>;
}

const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  organizationList: [],
  loading: false,

  fetchOrganizationList: async () => {
    set({ loading: true });
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      // 使用伪数据初始化
      set({ organizationList: mockOrganizationData, loading: false });
    } catch (error) {
      console.error('Failed to fetch organization data', error);
      set({ loading: false });
    }
  },

  addOrganization: async (organization: Omit<Organization, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 生成新ID
      const newId =
        get().organizationList.length > 0
          ? Math.max(...get().organizationList.map(a => a.id)) + 1
          : 1;

      // 创建新组织记录
      const newOrganization: Organization = { ...organization, id: newId };

      // 更新状态
      set(state => ({ organizationList: [...state.organizationList, newOrganization] }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add organization', error);
      return Promise.reject(error);
    }
  },

  updateOrganization: async (id: number, updatedOrganization: Omit<Organization, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        organizationList: state.organizationList.map(organization =>
          organization.id === id ? { ...updatedOrganization, id } : organization
        ),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update organization', error);
      return Promise.reject(error);
    }
  },

  deleteOrganization: async (id: number) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        organizationList: state.organizationList.filter(organization => organization.id !== id),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete organization', error);
      return Promise.reject(error);
    }
  },
}));

export default useOrganizationStore;