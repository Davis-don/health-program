import { create } from 'zustand';

interface FormState {
  profile: boolean;
  id: string | null;
  openProfile: () => void;    // Action to set profile true
  closeProfile: () => void;   // Action to set profile false
  setId: (newId: string) => void;
}

const useProfileStore = create<FormState>((set) => ({
  profile: false,
  id: null,

  openProfile: () => {
    set(() => ({
      profile: true,
    }));
  },

  closeProfile: () => {
    set(() => ({
      profile: false,
    }));
  },

  setId: (newId: string) => {
    set(() => ({
      id: newId,
    }));
  },
}));

export default useProfileStore;

