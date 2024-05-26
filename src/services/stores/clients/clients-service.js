import { create } from 'zustand';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';
import { withLoadingStateHandling } from '../../loading-handling';
import axios from 'axios';

export const useClientsStore = create((set) => ({
  clients: null,
  selectedClient: {
    name: '',
    contact: ''
  },
  isLoading: false,

  getClient: withLoadingStateHandling(async (clientId) => {
    const response = await axiosPrivate.get(`${Urls.CLIENTS}/${clientId}`);
    await set({ selectedClient: response.data })
  }, set),

  getClients: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.CLIENTS);
    await set({ clients: response.data })
  }, set),

  addClient: withLoadingStateHandling(async (client) => {
    const response = await axiosPrivate.post(Urls.CLIENTS, client);
    await set(({ clients }) => ({
      clients: [...clients, response.data]
    }));
  }, set),

  updateClient: withLoadingStateHandling(async (client) => {
    const response = await axiosPrivate.put(Urls.CLIENTS, client);
    await set(({ clients }) => ({
      clients: clients.map((item) => item.id === client.id ? response.data : item),
    }));
  }, set),

  deleteClient: withLoadingStateHandling(async (clientId) => {
    await axiosPrivate.delete(`${Urls.CLIENTS}/${clientId}`);
    await set(({ clients }) => ({
      clients: clients.filter((item) => item.id !== clientId),
    }));
  }, set),

  uploadExel: withLoadingStateHandling(async (formData) => {
    await axiosPrivate.post(Urls.CLIENT_IMPORT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }, set),

  setSelectedClient: (selectedClient) => {
    set({ selectedClient })
  },
}));