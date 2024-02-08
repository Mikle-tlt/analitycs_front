import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../http";

export const usePointsStore = create((set) => ({
  points: null,
  loading: false,

  getPoints: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/points/${userId}`);
      await set({ points: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addPoint: async (userId, point) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${API_URL}/points/${userId}`, point);
      await set(({ points }) => ({
        points: [...points, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updatePoint: async (point) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${API_URL}/points`, point);
      console.log(response.data)
      await set((state) => {
        const updatedPoints = state.points.map((item) => {
          return item.id === point.id ? response.data : item;
        });
        return {
          points: updatedPoints,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deletePoint: async (pointId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${API_URL}/points/${pointId}`);
      await set((state) => {
        const updatedPoints = state.points.filter(
          (item) => item.id !== pointId,
        );
        return {
          points: updatedPoints,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));