import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../../http";

const OFFLINE_POINTS_URL = `${API_URL}/analytics/online/abc`;
export const useOnlineABCStore = create((set) => ({
  defaultOnlineABCList: [],
  onlineABCList: [],
  labelText: '',
  loading: false,

  getOnlineABC: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${userId}`);
      await set({  })
      await set({
        defaultOnlineABCList: response.data.onlineABCDTOS,
        onlineABCList: response.data.onlineABCDTOS,
        labelText: response.data.labelText
      })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  getFilteredOnlineABC: async (userId, withDate, byDate) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${userId}/filter/${withDate}/${byDate}`);
      await set({
        onlineABCList: response.data.onlineABCDTOS,
        labelText: response.data.labelText
      })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  setOnlineABC: (data) => {
    set({ onlineGeneralList: data })
  }
}));