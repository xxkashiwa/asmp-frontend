import { mockPartnershipData } from '@/pages/partnership-management/mock-data';
import { Partnership } from '@/types';
import { create } from 'zustand';

interface PartnershipStore {
  partnershipList: Partnership[];
  loading: boolean;
  fetchPartnershipList: () => Promise<void>;
  addPartnership: (partnership: Omit<Partnership, 'id'>) => Promise<void>;
  updatePartnership: (
    id: number,
    updatedPartnership: Omit<Partnership, 'id'>
  ) => Promise<void>;
  deletePartnership: (id: number) => Promise<void>;
}

const usePartnershipStore = create<PartnershipStore>((set, get) => ({
  partnershipList: [],
  loading: false,

  fetchPartnershipList: async () => {
    set({ loading: true });
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      // 使用伪数据初始化
      set({ partnershipList: mockPartnershipData, loading: false });
    } catch (error) {
      console.error('Failed to fetch partnership data', error);
      set({ loading: false });
    }
  },

  addPartnership: async (partnership: Omit<Partnership, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 生成新ID
      const newId =
        get().partnershipList.length > 0
          ? Math.max(...get().partnershipList.map(a => a.id)) + 1
          : 1;

      // 创建新合作伙伴记录
      const newPartnership: Partnership = { ...partnership, id: newId };

      // 更新状态
      set(state => ({ partnershipList: [...state.partnershipList, newPartnership] }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add partnership', error);
      return Promise.reject(error);
    }
  },

  updatePartnership: async (id: number, updatedPartnership: Omit<Partnership, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        partnershipList: state.partnershipList.map(partnership =>
          partnership.id === id ? { ...updatedPartnership, id } : partnership
        ),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update partnership', error);
      return Promise.reject(error);
    }
  },

  deletePartnership: async (id: number) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        partnershipList: state.partnershipList.filter(partnership => partnership.id !== id),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete partnership', error);
      return Promise.reject(error);
    }
  },
}));

export default usePartnershipStore;