import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../http";

export const useRegionsStore = create((set) => ({
  regions: null,
  loading: false,

  getRegions: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/regions/${userId}`);
      await set({ regions: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addRegion: async (name, userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${API_URL}/regions/${userId}`, { name });
      await set(({ regions }) => ({
        regions: [...regions, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateRegion: async (name, regionId) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${API_URL}/regions/${regionId}`, { name });
      await set((state) => {
        const updatedRegions = state.regions.map((item) => {
          return item.id === regionId ? response.data : item;
        });
        return {
          regions: updatedRegions,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteRegion: async (regionId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${API_URL}/regions/${regionId}`);
      await set((state) => {
        const updatedRegions = state.regions.filter(
          (item) => item.id !== regionId,
        );
        return {
          regions: updatedRegions,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));