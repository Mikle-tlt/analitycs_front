import {create} from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,

  login: async (user) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`http://localhost:8080/auth`, user);
      await set({ user: response.data })
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    set({ user: null })
    localStorage.removeItem("user");
  },
  setUser: (user) => {
    set({ user })
  }
}));