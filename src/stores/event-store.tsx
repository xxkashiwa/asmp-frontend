import { mockEventData } from '@/pages/event-management/mock-data';
import { Event } from '@/types';
import { create } from 'zustand';

interface EventStore {
  eventList: Event[];
  loading: boolean;
  fetchEventList: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (
    id: number,
    updatedEvent: Omit<Event, 'id'>
  ) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
}

const useEventStore = create<EventStore>((set, get) => ({
  eventList: [],
  loading: false,

  fetchEventList: async () => {
    set({ loading: true });
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      // 使用伪数据初始化
      set({ eventList: mockEventData, loading: false });
    } catch (error) {
      console.error('Failed to fetch event data', error);
      set({ loading: false });
    }
  },

  addEvent: async (event: Omit<Event, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 生成新ID
      const newId =
        get().eventList.length > 0
          ? Math.max(...get().eventList.map(a => a.id)) + 1
          : 1;

      // 创建新事件记录
      const newEvent: Event = { ...event, id: newId };

      // 更新状态
      set(state => ({ eventList: [...state.eventList, newEvent] }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add event', error);
      return Promise.reject(error);
    }
  },

  updateEvent: async (id: number, updatedEvent: Omit<Event, 'id'>) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        eventList: state.eventList.map(event =>
          event.id === id ? { ...updatedEvent, id } : event
        ),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update event', error);
      return Promise.reject(error);
    }
  },

  deleteEvent: async (id: number) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 更新状态
      set(state => ({
        eventList: state.eventList.filter(event => event.id !== id),
      }));

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete event', error);
      return Promise.reject(error);
    }
  },
}));

export default useEventStore;