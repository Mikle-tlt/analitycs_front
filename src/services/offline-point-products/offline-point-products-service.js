import {API_URL} from "../http";
import {create} from "zustand";
import axios from "axios";

const OFFLINE_POINTS_URL = `${API_URL}/offline/points/products`;
export const useOfflinePointProductStore = create((set) => ({
  offlineProducts: [],
  loading: false,

  getOfflineProducts: async (offlinePointId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${offlinePointId}`);
      await set({ offlineProducts: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addOfflineProduct: async (offlinePointId, offlineProduct) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${OFFLINE_POINTS_URL}/${offlinePointId}`, offlineProduct);
      await set(({ offlineProducts }) => ({
        offlineProducts: [...offlineProducts, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateOfflineProduct: async (offlineProduct) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${OFFLINE_POINTS_URL}`, offlineProduct);
      await set((state) => {
        const updatedOfflineProducts = state.offlineProducts.map((item) => {
          return item.id === offlineProduct.id ? response.data : item;
        });
        return {
          offlineProducts: updatedOfflineProducts,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteOfflineProduct: async(offlineProductId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${OFFLINE_POINTS_URL}/${offlineProductId}`);
      await set((state) => {
        const updatedOfflineProducts = state.offlineProducts.filter(
          (item) => item.id !== offlineProductId,
        );
        return {
          offlineProducts: updatedOfflineProducts,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));