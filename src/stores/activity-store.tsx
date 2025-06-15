import { Activity } from '@/models/activity';
import { getAllActivity } from '@/services/activity-service';
import { create } from 'zustand';

interface ActivityStoreState {
  activities: Activity[];
  fetchActivities: () => Promise<void>;
}

const useActivityStore = create<ActivityStoreState>(set => ({
  activities: [],

  fetchActivities: async () => {
    const data = await getAllActivity();
    set({ activities: data });
  },
}));

export default useActivityStore;
