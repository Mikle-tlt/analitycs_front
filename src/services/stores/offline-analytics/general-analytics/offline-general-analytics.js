import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useOfflineGeneralStore = create((set) => ({
  defaultOfflineGeneralList: [],
  offlineGeneralList: [],
  isLoading: false,

  getOfflineGeneral: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.ANALYTICS_OFFLINE_GENERAL);
    await set({
      defaultOfflineGeneralList: response.data,
      offlineGeneralList: response.data
    })
  }, set),

  getFilteredOfflineGeneral: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(`${Urls.ANALYTICS_OFFLINE_GENERAL}/filter/${withDate}/${byDate}`);
    await set({ offlineGeneralList: response.data })
  }, set),

  setDefaultOfflineGeneral: (data) => {
    set({ offlineGeneralList: data })
  }
}));