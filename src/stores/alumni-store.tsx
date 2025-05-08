import { mockAlumniData } from '@/pages/alumni-management/mock-data';
import { Alumni } from '@/types';
import { create } from 'zustand';

interface AlumniStore {
  alumniList: Alumni[];
  loading: boolean;
  fetchAlumniList: () => Promise<void>;
  addAlumni: (alumni: Omit<Alumni, 'id'>) => Promise<void>;
  updateAlumni: (
    id: number,
    updatedAlumni: Omit<Alumni, 'id'>
  ) => Promise<void>;
  deleteAlumni: (id: number) => Promise<void>;
}

const useAlumniStore = create<AlumniStore>((set, get) => ({
  alumniList: [],
  loading: false,

  fetchAlumniList: async () => {
    set({ loading: true });
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      // 使用伪数据初始化
      set({ alumniList: mockAlumniData, loading: false });
    } catch (error) {
      console.error('Failed to fetch alumni data', error);
      set({ loading: false });
    }
  },

  addAlumni: async (alumni: Omit<Alumni, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 生成新ID
      const newId =
        get().alumniList.length > 0
          ? Math.max(...get().alumniList.map(a => a.id)) + 1
          : 1;

      // 创建新校友记录
      const newAlumni: Alumni = { ...alumni, id: newId };

      // 更新状态
      set(state => ({ alumniList: [...state.alumniList, newAlumni] }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add alumni', error);
      return Promise.reject(error);
    }
  },

  updateAlumni: async (id: number, updatedAlumni: Omit<Alumni, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        alumniList: state.alumniList.map(alumni =>
          alumni.id === id ? { ...updatedAlumni, id } : alumni
        ),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update alumni', error);
      return Promise.reject(error);
    }
  },

  deleteAlumni: async (id: number) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        alumniList: state.alumniList.filter(alumni => alumni.id !== id),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete alumni', error);
      return Promise.reject(error);
    }
  },
}));

export default useAlumniStore;
