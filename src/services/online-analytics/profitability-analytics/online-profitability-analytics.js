import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../../http";

const OFFLINE_POINTS_URL = `${API_URL}/analytics/online/profitability`;
export const useOnlineProfitabilityStore = create((set) => ({
  profitabilityData: [],
  loading: false,
  labelText: '',

  getOnlineProfitabilityData: async (userId, dateWithF, dateByF, dateWithS, dateByS) => {
    try {
      set({ isLoading: true });
      const response = await axios
        .get(`${OFFLINE_POINTS_URL}/${userId}/filter/${dateWithF}/${dateByF}/${dateWithS}/${dateByS}`);
      await set({
        profitabilityData: response.data.profitabilities,
        labelText: response.data.labelText,
      })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  setDefaultProfitability: () => {
    set({
      profitabilityData: [],
      labelText: ''
    });
  }
}));