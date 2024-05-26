import { create } from 'zustand';
import axios from "axios";
import { withLoadingStateHandling } from '../../loading-handling';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';

export const useOfflinePointProductStore = create((set) => ({
  offlineProducts: [],
  isLoading: false,

  getOfflineProducts: withLoadingStateHandling(async (offlinePointId) => {
    const response = await axiosPrivate.get(`${Urls.OFFLINE_POINTS_PRODUCTS}/${offlinePointId}`);
    await set({ offlineProducts: response.data })
  }, set),

  addOfflineProduct: withLoadingStateHandling(async (offlinePointId, offlineProduct) => {
    const response = await axiosPrivate.post(`${Urls.OFFLINE_POINTS_PRODUCTS}/${offlinePointId}`, offlineProduct);
    await set(({ offlineProducts }) => ({ offlineProducts: [...offlineProducts, response.data] }));
  }, set),

  updateOfflineProduct: withLoadingStateHandling(async (offlineProduct) => {
    const response = await axiosPrivate.put(Urls.OFFLINE_POINTS_PRODUCTS, offlineProduct);
    await set(({ offlineProducts }) => ({
      offlineProducts: offlineProducts.map((item) => item.id === offlineProduct.id ? response.data : item),
    }));
  }, set),

  deleteOfflineProduct: withLoadingStateHandling(async (offlinePointProductId) => {
    await axiosPrivate.delete(`${Urls.OFFLINE_POINTS_PRODUCTS}/${offlinePointProductId}`);
    await set(({ offlineProducts }) => ({
      offlineProducts: offlineProducts.filter((item) => item.id !== offlinePointProductId)
    }));
  }, set),
}));