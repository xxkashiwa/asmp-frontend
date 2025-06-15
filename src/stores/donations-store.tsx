
import { Donations }  from '@/models/donations'
import { getAllDonations } from '@/services/donations-service';
import { create } from 'zustand';

interface DonationsStoreState {
  donationsList: Donations[];
  fetchDonationsList: () => Promise<void>;
}

const useDonationsStore = create<DonationsStoreState>((set) => ({
  donationsList: [],
  fetchDonationsList: async () => {
    try {
      const data = await getAllDonations();
      set({ donationsList: data});
    } catch(error) {
      console.error('Error fetching donations:', error);
      throw error;
    }
  },
}));

export default useDonationsStore;