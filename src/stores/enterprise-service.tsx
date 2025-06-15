
import { Enterprise }  from '@/models/enterprise'
import { getAllEnterprise } from '@/services/enterprise-service';
import { create } from 'zustand';

interface EnterpriseStoreState {
  enterpriseList: Enterprise[];
  fetchEnterpriseList: () => Promise<void>;
}

const useEnterpriseStore = create<EnterpriseStoreState>((set) => ({
  enterpriseList: [],
  fetchEnterpriseList: async () => {
    try {
      const data = await getAllEnterprise();
      set({ enterpriseList: data});
    } catch(error) {
      console.error('Error fetching enterprise:', error);
      throw error;
    }
  },
}));

export default useEnterpriseStore;