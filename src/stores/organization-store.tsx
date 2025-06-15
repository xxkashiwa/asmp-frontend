import { Organization } from '@/models/organization';
import { getAllOrganizations } from '@/services/organization-service';
import { create } from 'zustand';
interface OrganizationStoreState {
  organizations: Organization[];
  fetchOrganizations: () => Promise<void>;
}

const useOrganizationStore = create<OrganizationStoreState>(set => ({
  organizations: [],
  fetchOrganizations: async () => {
    const data = await getAllOrganizations();
    set({ organizations: data });
  },
}));

export default useOrganizationStore;
