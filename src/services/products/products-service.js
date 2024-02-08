import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../http";

export const useProductsStore = create((set) => ({
  products: null,
  loading: false,

  getProducts: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/products/${userId}`);
      await set({ products: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addProduct: async (userId, product) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${API_URL}/products/${userId}`, product);
      await set(({ products }) => ({
        products: [...products, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateProduct: async (product) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${API_URL}/products`, product);
      await set((state) => {
        const updatedProducts = state.products.map((item) => {
          return item.id === product.id ? response.data : item;
        });
        return {
          products: updatedProducts,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProduct: async (productId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${API_URL}/products/${productId}`);
      await set((state) => {
        const updatedProducts = state.products.filter(
          (item) => item.id !== productId,
        );
        return {
          products: updatedProducts,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
}));