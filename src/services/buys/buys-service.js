import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../http";

export const useBuysStore = create((set) => ({
  buys: [],
  buy: null,
  loading: false,

  getBuys: async (clientId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/online/buys/${clientId}`);
      await set({ buys: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  getBuy: async (buyId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/online/buys/single/${buyId}`);
      await set({ buy: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addBuy: async (clientId, buy) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${API_URL}/online/buys/${clientId}`, buy);
      await set(({ buys }) => ({
        buys: [...buys, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateBuy: async (buy) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${API_URL}/online/buys`, buy);
      await set((state) => {
        const updatedBuys = state.buys.map((item) => {
          return item.id === buy.id ? response.data : item;
        });
        return {
          buys: updatedBuys,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteBuy: async (buyId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${API_URL}/online/buys/${buyId}`);
      await set((state) => {
        const updatedBuys = state.buys.filter(
          (item) => item.id !== buyId,
        );
        return {
          buys: updatedBuys,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));