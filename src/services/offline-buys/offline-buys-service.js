import {API_URL} from "../http";
import {create} from "zustand";
import axios from "axios";

const OFFLINE_BUYS_URL = `${API_URL}/offline/points/buys`;
export const useOfflineBuysStore = create((set) => ({
  offlineBuys: [],
  offlineBuy: null,
  loading: false,

  getOfflineBuys: async (offlinePointId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_BUYS_URL}/${offlinePointId}`);
      await set({ offlineBuys: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  getOfflineBuy: async (offlineBuyId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_BUYS_URL}/single/${offlineBuyId}`);
      await set({ offlineBuy: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addOfflineBuy: async (date, offlinePointId) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${OFFLINE_BUYS_URL}/${offlinePointId}`, { date });
      await set(({ offlineBuys }) => ({
        offlineBuys: [...offlineBuys, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateOfflineBuy: async (date, offlineBuyId) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${OFFLINE_BUYS_URL}/${offlineBuyId}`, { date });
      await set((state) => {
        const updatedOfflineBuys = state.offlineBuys.map((item) => {
          return item.id === offlineBuyId ? response.data : item;
        });
        return {
          offlineBuys: updatedOfflineBuys,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteOfflineBuy: async(offlineBuyId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${OFFLINE_BUYS_URL}/${offlineBuyId}`);
      await set((state) => {
        const updatedOfflineBuys = state.offlineBuys.filter(
          (item) => item.id !== offlineBuyId,
        );
        return {
          offlineBuys: updatedOfflineBuys,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));