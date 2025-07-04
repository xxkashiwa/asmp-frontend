import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStoreState {
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      setAccessToken: token => {
        set({ accessToken: token });
      },
      setIsAuthenticated: isAuthenticated => {
        set({ isAuthenticated });
      },
    }),
    {
      name: 'auth-store',
      partialize: state => ({ 
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
