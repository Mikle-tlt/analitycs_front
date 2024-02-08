import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../http";

const OFFLINE_POINTS_URL = `${API_URL}/points/offline`;
export const useOfflinePointsStore = create((set) => ({
  offlinePoints: null,
  offlinePoint: null,
  loading: false,

  getOfflinePoints: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${userId}`);
      await set({ offlinePoints: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  getOfflinePoint: async (offlinePointId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/single/${offlinePointId}`);
      await set({ offlinePoint: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addOfflinePoint: async (userId, offlinePoint) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${OFFLINE_POINTS_URL}/${userId}`, offlinePoint);
      await set(({ offlinePoints }) => ({
        offlinePoints: [...offlinePoints, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateOfflinePoint: async (offlinePoint) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${OFFLINE_POINTS_URL}`, offlinePoint);
      await set((state) => {
        const updatedOfflinePoints = state.offlinePoints.map((item) => {
          return item.id === offlinePoint.id ? response.data : item;
        });
        return {
          offlinePoints: updatedOfflinePoints,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteOfflinePoint: async(offlinePointId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${OFFLINE_POINTS_URL}/${offlinePointId}`);
      await set((state) => {
        const updatedOfflinePoints = state.offlinePoints.filter(
          (item) => item.id !== offlinePointId,
        );
        return {
          offlinePoints: updatedOfflinePoints,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));