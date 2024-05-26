import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useOnlineGeneralStore = create((set) => ({
  defaultOnlineGeneralList: [],
  onlineGeneralList: [],
  isLoading: false,

  getOnlineGeneral: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.ANALYTICS_ONLINE_GENERAL);
    await set({
      defaultOnlineGeneralList: response.data,
      onlineGeneralList: response.data
    })
  }, set),

  getFilteredOnlineGeneral: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(`${Urls.ANALYTICS_ONLINE_GENERAL}/filter/${withDate}/${byDate}`);
    await set({ onlineGeneralList: response.data })
  }, set),

  setOnlineGeneral: (data) => {
    set({ onlineGeneralList: data })
  }
}));