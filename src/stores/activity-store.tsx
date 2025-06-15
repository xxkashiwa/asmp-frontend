import { Activity } from '@/models/activity';
import { getAllActivity } from '@/services/activity-service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ActivityStoreState {
  activities: Activity[];
  fetchActivities: () => Promise<void>;
  addActivity: (activity: Activity) => void;
  updateActivity: (updatedActivity: Activity) => void;
  deleteActivity: (id: string) => void;
}

const useActivityStore = create<ActivityStoreState>()(
  persist(
    set => ({
      activities: [],

      fetchActivities: async () => {
        const data = await getAllActivity();
        set({ activities: data });
      },

      addActivity: (activity: Activity) => {
        set(state => ({
          activities: [...state.activities, activity],
        }));
      },

      updateActivity: (updatedActivity: Activity) => {
        console.log('Updating activity:', updatedActivity);
        set(state => ({
          activities: state.activities.map(activity =>
            activity.id === updatedActivity.id ? updatedActivity : activity
          ),
        }));
      },

      deleteActivity: (id: string) => {
        set(state => ({
          activities: state.activities.filter(activity => activity.id !== id),
        }));
      },
    }),
    {
      name: 'activity-store',
      partialize: state => ({
        activities: state.activities,
      }),
    }
  )
);

export default useActivityStore;
