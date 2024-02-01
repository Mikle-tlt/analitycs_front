import {create} from "zustand";
import axios from "axios";
import {API_URL} from "../http";

export const useClientsStore = create((set) => ({
  clients: null,
  selectedClient: {
    name: '',
    contact: ''
  },
  loading: false,

  getClients: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/clients/${userId}`);
      await set({ clients: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  addClient: async (client, userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${API_URL}/clients/${userId}`, client);
      await set(({ clients }) => ({
        clients: [...clients, response.data]
      }));
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  updateClient: async (client) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${API_URL}/clients`, client);
      await set((state) => {
        const updatedClients = state.clients.map((item) => {
          return item.id === client.id ? response.data : item;
        });
        return {
          clients: updatedClients,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteClient: async (clientId) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${API_URL}/clients/${clientId}`);
      await set((state) => {
        const updatedClients = state.clients.filter(
          (item) => item.id !== clientId,
        );
        return {
          clients: updatedClients,
        };
      });
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  },
  setSelectedClient: (selectedClient) => {
    set({ selectedClient })
  },
  getSelectedClient: async (clientId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}/clients/selected/${clientId}`);
      await set({ selectedClient: response.data })
    } catch (e) {
      throw e.response?.data;
    } finally {
      set({ isLoading: false });
    }
  }
}));