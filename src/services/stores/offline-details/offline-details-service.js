import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';

export const useOfflineDetailsStore = create((set) => ({
  offlineDetails: [],
  isLoading: false,

  getOfflineDetails: withLoadingStateHandling(async (offlineBuyId) => {
    const response = await axiosPrivate.get(`${Urls.OFFLINE_BUYS_DETAILS}/${offlineBuyId}`);
    await set({ offlineDetails: response.data })
  }, set),


  addOfflineDetail: withLoadingStateHandling(async (offlineBuyId, offlineDetail) => {
    const response = await axiosPrivate.post(`${Urls.OFFLINE_BUYS_DETAILS}/${offlineBuyId}`, offlineDetail);
    if (response.data.oldProduct) {
      await set(({ offlineDetails }) => ({
        offlineDetails: offlineDetails.map((item) => item.id === response.data.id ? response.data : item),
      }));
    } else {
      await set(({ offlineDetails }) => ({ offlineDetails: [...offlineDetails, response.data] }));
    }
  }, set),

  deleteOfflineDetail: withLoadingStateHandling(async (offlineDetailId) => {
    await axiosPrivate.delete(`${Urls.OFFLINE_BUYS_DETAILS}/${offlineDetailId}`);
    await set(({ offlineDetails }) => ({
      offlineDetails: offlineDetails.filter((item) => item.id !== offlineDetailId)
    }));
  }, set),
}));