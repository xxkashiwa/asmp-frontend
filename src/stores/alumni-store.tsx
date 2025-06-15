import { Alumni } from '@/models/alumni';
import { getAllAlumni } from '@/services/alumni-service';
import { create } from 'zustand';
interface AlumniStoreState {
  alumniList: Alumni[];
  fetchAlumniList: () => Promise<void>;
}

const useAlumniStore = create<AlumniStoreState>(set => ({
  alumniList: [],

  fetchAlumniList: async () => {
    const data = await getAllAlumni();
    set({ alumniList: data });
  },
}));

export default useAlumniStore;
