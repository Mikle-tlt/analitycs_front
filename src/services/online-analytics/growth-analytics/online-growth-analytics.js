import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../../http";

const OFFLINE_POINTS_URL = `${API_URL}/analytics/online/growth`;
export const useOnlineGrowthStore = create((set) => ({
  revenues: [],
  days: [],
  loading: false,
  labelText: '',

  getOnlineGrowthData: async (userId, productId, withDate, byDate) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${userId}/filter/${productId}/${withDate}/${byDate}`);
      await set({
        revenues: response.data.revenues,
        days: response.data.days,
        labelText: response.data.labelText,
      })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  setDefaultData: () => {
    set({
      revenues: [],
      days: [],
      labelText: ''
    })
  },
}));