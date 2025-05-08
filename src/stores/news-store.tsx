import { News } from '@/types';
import { create } from 'zustand';
import { mockNewsData } from '@/pages/campus-news-management/mock-data';

interface NewsStore {
  newsList: News[];
  loading: boolean;
  fetchNewsList: () => Promise<void>;
  addNews: (news: Omit<News, 'id'>) => Promise<void>;
  updateNews: (id: number, updatedNews: Omit<News, 'id'>) => Promise<void>;
  deleteNews: (id: number) => Promise<void>;
}

const useNewsStore = create<NewsStore>((set, get) => ({
  newsList: [],
  loading: false,

  fetchNewsList: async () => {
    set({ loading: true });
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      // 使用伪数据初始化
      set({ newsList: mockNewsData, loading: false });
      ;
    } catch (error) {
      console.error('Failed to fetch news data', error);
      set({ loading: false });
    }
  },

  addNews: async (news: Omit<News, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 生成新ID
      const newId =
        get().newsList.length > 0
          ? Math.max(...get().newsList.map(n => n.id)) + 1
          : 1;

      // 创建新新闻记录
      const newNews: News = { ...news, id: newId };

      // 更新状态
      set(state => ({ newsList: [...state.newsList, newNews] }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add news', error);
      return Promise.reject(error);
    }
  },

  updateNews: async (id: number, updatedNews: Omit<News, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        newsList: state.newsList.map(news =>
          news.id === id ? { ...updatedNews, id } : news
        ),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update news', error);
      return Promise.reject(error);
    }
  },

  deleteNews: async (id: number) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        newsList: state.newsList.filter(news => news.id !== id),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete news', error);
      return Promise.reject(error);
    }
  },
}));

export default useNewsStore;