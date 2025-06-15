import { Organization } from '@/models/organization';
import { getAllOrganizations } from '@/services/organization-service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrganizationStoreState {
  organizations: Organization[];
  fetchOrganizations: () => Promise<void>;
  addOrganization: (organization: Organization) => void;
  updateOrganization: (id: string, updatedOrganization: Organization) => void;
  deleteOrganization: (id: string) => void;
}

const useOrganizationStore = create<OrganizationStoreState>()(
  persist(
    set => ({
      organizations: [],

      fetchOrganizations: async () => {
        const data = await getAllOrganizations();
        set({ organizations: data });
      },

      addOrganization: (organization: Organization) => {
        set(state => ({
          organizations: [...state.organizations, organization],
        }));
      },

      updateOrganization: (id: string, updatedOrganization: Organization) => {
        console.log('Updating organization:', updatedOrganization);
        set(state => ({
          organizations: state.organizations.map(organization =>
            organization.id === id ? updatedOrganization : organization
          ),
        }));
      },

      deleteOrganization: (id: string) => {
        set(state => ({
          organizations: state.organizations.filter(
            organization => organization.id !== id
          ),
        }));
      },
    }),
    {
      name: 'organization-store',
      partialize: state => ({
        organizations: state.organizations,
      }),
    }
  )
);

export default useOrganizationStore;
