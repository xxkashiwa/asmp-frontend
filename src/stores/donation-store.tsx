import { mockDonationData } from '@/pages/donation-management/mock-data';
import { Donation } from '@/types';
import { create } from 'zustand';

interface DonationStore {
  donationList: Donation[];
  loading: boolean;
  fetchDonationList: () => Promise<void>;
  addDonation: (donation: Omit<Donation, 'id'>) => Promise<void>;
  updateDonation: (
    id: number,
    updatedDonation: Omit<Donation, 'id'>
  ) => Promise<void>;
  deleteDonation: (id: number) => Promise<void>;
}

const useDonationStore = create<DonationStore>((set, get) => ({
  donationList: [],
  loading: false,

  fetchDonationList: async () => {
    set({ loading: true });
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      // 使用伪数据初始化
      set({ donationList: mockDonationData, loading: false });
    } catch (error) {
      console.error('Failed to fetch donation data', error);
      set({ loading: false });
    }
  },

  addDonation: async (donation: Omit<Donation, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 生成新ID
      const newId =
        get().donationList.length > 0
          ? Math.max(...get().donationList.map(a => a.id)) + 1
          : 1;

      // 创建新捐赠记录
      const newDonation: Donation = { ...donation, id: newId };

      // 更新状态
      set(state => ({ donationList: [...state.donationList, newDonation] }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add donation', error);
      return Promise.reject(error);
    }
  },

  updateDonation: async (id: number, updatedDonation: Omit<Donation, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        donationList: state.donationList.map(donation =>
          donation.id === id ? { ...updatedDonation, id } : donation
        ),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update donation', error);
      return Promise.reject(error);
    }
  },

  deleteDonation: async (id: number) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        donationList: state.donationList.filter(donation => donation.id !== id),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete donation', error);
      return Promise.reject(error);
    }
  },
}));

export default useDonationStore;