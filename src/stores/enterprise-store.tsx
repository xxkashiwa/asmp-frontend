import { Enterprise } from '@/models/enterprise';
import { getAllEnterprise } from '@/services/enterprise-service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EnterpriseStoreState {
  enterpriseList: Enterprise[];
  fetchEnterpriseList: () => Promise<void>;
  addEnterprise: (enterprise: Enterprise) => void;
  updateEnterprise: (updatedEnterprise: Enterprise) => void;
  deleteEnterprise: (id: string) => void;
}

const useEnterpriseStore = create<EnterpriseStoreState>()(
  persist(
    set => ({
      enterpriseList: [],

      fetchEnterpriseList: async () => {
        try {
          const data = await getAllEnterprise();
          set({ enterpriseList: data });
        } catch (error) {
          console.error('Error fetching enterprise:', error);
          throw error;
        }
      },

      addEnterprise: (enterprise: Enterprise) => {
        set(state => ({
          enterpriseList: [...state.enterpriseList, enterprise],
        }));
      },

      updateEnterprise: (updatedEnterprise: Enterprise) => {
        set(state => ({
          enterpriseList: state.enterpriseList.map(enterprise =>
            enterprise.id === updatedEnterprise.id
              ? updatedEnterprise
              : enterprise
          ),
        }));
      },

      deleteEnterprise: (id: string) => {
        set(state => ({
          enterpriseList: state.enterpriseList.filter(
            enterprise => enterprise.id !== id
          ),
        }));
      },
    }),
    {
      name: 'enterprise-store',
      partialize: state => ({
        enterpriseList: state.enterpriseList,
      }),
    }
  )
);

export default useEnterpriseStore;
