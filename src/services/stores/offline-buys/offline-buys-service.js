import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { Urls } from '../../../constants';
import { axiosPrivate } from '../../../utils';

export const useOfflineBuysStore = create((set) => ({
  offlineBuy: null,
  offlineBuys: [],
  isLoading: false,

  getOfflineBuy: withLoadingStateHandling(async (offlineBuyId) => {
    const response = await axiosPrivate.get(`${Urls.OFFLINE_BUYS}/${offlineBuyId}`);
    await set({ offlineBuy: response.data })
  }, set),

  getOfflineBuys: withLoadingStateHandling(async (offlinePointId) => {
    const response = await axiosPrivate.get(`${Urls.OFFLINE_BUYS}/point/${offlinePointId}`);
    await set({ offlineBuys: response.data })
  }, set),

  addOfflineBuy: withLoadingStateHandling(async (date, offlinePointId) => {
    const response = await axiosPrivate.post(`${Urls.OFFLINE_BUYS}/point/${offlinePointId}`, { date });
    await set(({ offlineBuys }) => ({ offlineBuys: [...offlineBuys, response.data] }));
  }, set),

  updateOfflineBuy: withLoadingStateHandling(async (date, id) => {
    const response = await axiosPrivate.put(Urls.OFFLINE_BUYS, { id, date });
    await set(({ offlineBuys }) => ({
      offlineBuys: offlineBuys.map((item) => item.id === id ? response.data : item),
    }));
  }, set),

  deleteOfflineBuy: withLoadingStateHandling(async (offlineBuyId) => {
    await axiosPrivate.delete(`${Urls.OFFLINE_BUYS}/${offlineBuyId}`);
    await set(({ offlineBuys }) => ({
      offlineBuys: offlineBuys.filter((item) => item.id !== offlineBuyId)
    }));
  }, set),

  uploadExel: withLoadingStateHandling(async (formData) => {
    await axiosPrivate.post(Urls.OFFLINE_BUYS_IMPORT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }, set),
}));