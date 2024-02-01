import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../http";

export const useProfilesStore = create((set) => ({
  profiles: null,
  loading: false,

  getProfiles: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/profiles`);
      await set({ profiles: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateProfile: async (role, userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${API_URL}/profiles/${userId}/edit/${role}`, {});
      await set((state) => {
        const updatedProfiles = state.profiles.map((item) => {
          return item.id === userId ? response.data : item;
        });
        return {
          profiles: updatedProfiles,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProfile: async (userId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${API_URL}/profiles/delete/${userId}`);
      await set((state) => {
        const updatedProfiles = state.profiles.filter(
          (item) => item.id !== userId,
        );
        return {
          profiles: updatedProfiles,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addProfile: async (user) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${API_URL}/profiles/registration`, user);
      await set(({ profiles }) => ({
        profiles: [...profiles, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  }
}));