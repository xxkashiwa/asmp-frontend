import { Notice } from '@/models/notice';
import { getAllNotice } from '@/services/notice-service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoticeStoreState {
  noticeList: Notice[];
  fetchNoticeList: () => Promise<void>;
  addNotice: (notice: Notice) => void;
  updateNotice: (id: string, updatedNotice: Notice) => void;
  deleteNotice: (id: string) => void;
}

const useNoticeStore = create<NoticeStoreState>()(
  persist(
    set => ({
      noticeList: [],

      fetchNoticeList: async () => {
        const data = await getAllNotice();
        set({ noticeList: data });
      },

      addNotice: (notice: Notice) => {
        set(state => ({
          noticeList: [...state.noticeList, notice],
        }));
      },

      updateNotice: (id: string, updatedNotice: Notice) => {
        console.log('Updating notice:', updatedNotice);
        set(state => ({
          noticeList: state.noticeList.map(notice =>
            notice.id === id ? updatedNotice : notice
          ),
        }));
      },

      deleteNotice: (id: string) => {
        set(state => ({
          noticeList: state.noticeList.filter(notice => notice.id !== id),
        }));
      },
    }),
    {
      name: 'notice-store',
      partialize: state => ({
        noticeList: state.noticeList,
      }),
    }
  )
);

export default useNoticeStore;
