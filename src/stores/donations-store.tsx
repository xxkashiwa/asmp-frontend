import { Donations } from '@/models/donations';
import { getAllDonations } from '@/services/donations-service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DonationsStoreState {
  donationsList: Donations[];
  fetchDonationsList: () => Promise<void>;
  addDonation: (donation: Donations) => void;
  updateDonation: (updatedDonation: Donations) => void;
  deleteDonation: (id: string) => void;
}

const useDonationsStore = create<DonationsStoreState>()(
  persist(
    set => ({
      donationsList: [],

      fetchDonationsList: async () => {
        const data = await getAllDonations();
        set({ donationsList: data });
      },

      addDonation: (donation: Donations) => {
        set(state => ({
          donationsList: [...state.donationsList, donation],
        }));
      },

      updateDonation: (updatedDonation: Donations) => {
        console.log('Updating donation:', updatedDonation);
        set(state => ({
          donationsList: state.donationsList.map(donation =>
            donation.id === updatedDonation.id ? updatedDonation : donation
          ),
        }));
      },

      deleteDonation: (id: string) => {
        set(state => ({
          donationsList: state.donationsList.filter(
            donation => donation.id !== id
          ),
        }));
      },
    }),
    {
      name: 'donations-store',
      partialize: state => ({
        donationsList: state.donationsList,
      }),
    }
  )
);

export default useDonationsStore;
