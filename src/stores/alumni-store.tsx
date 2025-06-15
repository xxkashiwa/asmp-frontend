import { Alumni } from '@/models/alumni';
import { getAllAlumni } from '@/services/alumni-service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AlumniStoreState {
  alumniList: Alumni[];
  fetchAlumniList: () => Promise<void>;
  addAlumni: (alumni: Alumni) => void;
  updateAlumni: (studentId: string, updatedAlumni: Alumni) => void;
  deleteAlumni: (studentId: string) => void;
}

const useAlumniStore = create<AlumniStoreState>()(
  persist(
    set => ({
      alumniList: [],

      fetchAlumniList: async () => {
        const data = await getAllAlumni();
        set({ alumniList: data });
      },

      addAlumni: (alumni: Alumni) => {
        set(state => ({
          alumniList: [...state.alumniList, alumni],
        }));
      },

      updateAlumni: (studentId: string, updatedAlumni: Alumni) => {
        console.log('Updating alumni:', updatedAlumni);
        set(state => ({
          alumniList: state.alumniList.map(alumni =>
            alumni.studentId === studentId ? updatedAlumni : alumni
          ),
        }));
      },

      deleteAlumni: (studentId: string) => {
        set(state => ({
          alumniList: state.alumniList.filter(
            alumni => alumni.studentId !== studentId
          ),
        }));
      },
    }),
    {
      name: 'alumni-store',
      partialize: state => ({
        alumniList: state.alumniList,
      }),
    }
  )
);

export default useAlumniStore;
