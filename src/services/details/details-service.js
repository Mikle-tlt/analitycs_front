import {API_URL} from "../http";
import {create} from "zustand";
import axios from "axios";

const DETAILS_URL = `${API_URL}/online/buys/details`;
export const useDetailsStore = create((set) => ({
  details: [],
  loading: false,

  getDetails: async (buyId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${DETAILS_URL}/${buyId}`);
      await set({ details: response.data });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },

  addDetail: async (buyId, detail) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${DETAILS_URL}/${buyId}`, detail);
      if (response.data.oldProduct){
        await set((state) => {
          const updatedDetails = state.details.map((item) => {
            return item.id === response.data.id ? response.data : item;
          });
          return {
            details: updatedDetails,
          };
        });
      } else {
        await set(({ details }) => ({
          details: [...details, response.data]
        }));
      }
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },

  updateDetail: async (detail) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${DETAILS_URL}`, detail);
      if (response.data.oldProduct){
        await set((state) => {
          const updatedWithDeleting = state.details.filter(item => item.id !== detail.id);
          const updatedDetails = updatedWithDeleting.map((item) => {
            return item.id === response.data.id ? response.data : item;
          });
          return {
            details: updatedDetails,
          };
        });
      } else {
        await set((state) => {
          const updatedDetails = state.details.map((item) => {
            return item.id === detail.id ? response.data : item;
          });
          return {
            details: updatedDetails,
          };
        });
      }
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDetail: async(detailId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${DETAILS_URL}/${detailId}`);
      await set((state) => {
        const updatedDetails = state.details.filter(
          (item) => item.id !== detailId,
        );
        return {
          details: updatedDetails,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));