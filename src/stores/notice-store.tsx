
import { Notice }  from '@/models/notice'
import { getAllNotice } from '@/services/notice-service';
import { create } from 'zustand';

interface NoticeStoreState {
  noticeList: Notice[];
  fetchNoticeList: () => Promise<void>;
}

const useNoticeStore = create<NoticeStoreState>((set) => ({
  noticeList: [],
  fetchNoticeList: async () => {
    try {
      const data = await getAllNotice();
      set({ noticeList: data});
    } catch(error) {
      console.error('Error fetching notice:', error);
      throw error;
    }
  },
}));

export default useNoticeStore;