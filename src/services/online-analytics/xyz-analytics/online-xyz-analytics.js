import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../../http";

const OFFLINE_POINTS_URL = `${API_URL}/analytics/online/xyz`;
export const useOnlineXYZStore = create((set) => ({
  defaultOnlineXYZList: [],
  onlineXYZList: [],
  labelText: '',
  loading: false,

  getOnlineXYZ: async (userId, withDate, byDate) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${OFFLINE_POINTS_URL}/${userId}/filter/${withDate}/${byDate}`);
      await set({
        defaultOnlineXYZList: response.data.onlineXYZDTOS,
        onlineXYZList: response.data.onlineXYZDTOS,
        labelText: response.data.labelText
      })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  setOnlineXYZ: (data) => {
    set({ onlineXYZList: data })
  }
}));