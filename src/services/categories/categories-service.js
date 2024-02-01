import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../http";

export const useCategoriesStore = create((set) => ({
  categories: null,
  loading: false,

  getCategories: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/categories/${userId}`);
      await set({ categories: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addCategory: async (name, userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${API_URL}/categories/${userId}`, { name });
      await set(({ categories }) => ({
        categories: [...categories, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateCategory: async (name, categoryId) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${API_URL}/categories/${categoryId}`, { name });
      await set((state) => {
        const updatedCategories = state.categories.map((item) => {
          return item.id === categoryId ? response.data : item;
        });
        return {
          categories: updatedCategories,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCategory: async (categoryId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${API_URL}/categories/${categoryId}`);
      await set((state) => {
        const updatedCategories = state.categories.filter(
          (item) => item.id !== categoryId,
        );
        return {
          categories: updatedCategories,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));