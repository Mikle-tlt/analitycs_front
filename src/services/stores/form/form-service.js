import { create } from 'zustand';

export const useFormStore = create((set) => ({
  form: null,
  isLoading: false,

  setForm: (form) => {
    set({
      form
    });
  },
}));