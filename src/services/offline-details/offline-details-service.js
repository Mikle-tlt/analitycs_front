import {API_URL} from "../http";
import {create} from "zustand";
import axios from "axios";

const OFFLINE_POINTS_URL = `${API_URL}/offline/points/buys/details`;
export const useOfflineDetailsStore = create((set) => ({
  offlineDetails: [],
  loading: false,

  getOfflineDetails: async (offlineBuyId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${offlineBuyId}`);
      await set({ offlineDetails: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },

  addOfflineDetail: async (offlineBuyId, offlineDetails) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${OFFLINE_POINTS_URL}/${offlineBuyId}`, offlineDetails);
      await set(({ offlineDetails }) => ({
        offlineDetails: [...offlineDetails, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteOfflineDetail: async(offlineDetailId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${OFFLINE_POINTS_URL}/${offlineDetailId}`);
      await set((state) => {
        const updatedOfflineDetails = state.offlineDetails.filter(
          (item) => item.id !== offlineDetailId,
        );
        return {
          offlineDetails: updatedOfflineDetails,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));