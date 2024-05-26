import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';

export const useDetailsStore = create((set) => ({
  details: [],
  isLoading: false,

  getDetails: withLoadingStateHandling(async (buyId) => {
    const response = await axiosPrivate.get(`${Urls.ONLINE_BUYS_DETAILS}/${buyId}`);
    await set({ details: response.data });
  }, set),

  addDetail: withLoadingStateHandling(async (buyId, detail) => {
    const response = await axiosPrivate.post(`${Urls.ONLINE_BUYS_DETAILS}/${buyId}`, detail);
    if (response.data.oldProduct) {
      await set(({ details }) => ({
        details: details.map((item) => item.id === response.data.id ? response.data : item),
      }));
    } else {
      await set(({ details }) => ({ details: [...details, response.data] }));
    }
  }, set),

  updateDetail: withLoadingStateHandling(async (detail) => {
    const response = await axiosPrivate.put(Urls.ONLINE_BUYS_DETAILS, detail);
    if (response.data.oldProduct) {
      await set(({ details }) => {
        const updatedWithDeleting = details.filter(item => item.id !== detail.id);
        const updatedDetails = updatedWithDeleting.map((item) => item.id === response.data.id ? response.data : item);
        return {
          details: updatedDetails,
        };
      });
    } else {
      await set(({ details }) => ({
        details: details.map((item) => item.id === detail.id ? response.data : item),
      }));
    }
  }, set),

  deleteDetail: withLoadingStateHandling(async (detailId) => {
    await axiosPrivate.delete(`${Urls.ONLINE_BUYS_DETAILS}/${detailId}`);
    await set(({ details }) => ({
      details: details.filter((item) => item.id !== detailId)
    }));
  }, set),
}));