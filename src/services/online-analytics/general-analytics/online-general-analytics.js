import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../../http";

const OFFLINE_POINTS_URL = `${API_URL}/analytics/online/general`;
export const useOnlineGeneralStore = create((set) => ({
  defaultOnlineGeneralList: [],
  onlineGeneralList: [],
  loading: false,

  getOnlineGeneral: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${userId}`);
      await set({ defaultOnlineGeneralList: response.data })
      await set({ onlineGeneralList: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  getFilteredOnlineGeneral: async (userId, withDate, byDate) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${userId}/filter/${withDate}/${byDate}`);
      await set({ onlineGeneralList: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  setOnlineGeneral: (data) => {
    set({ onlineGeneralList: data })
  }
}));