import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useOfflineABCStore = create((set) => ({
  defaultOfflineABCList: [],
  offlineABCList: [],
  labelText: '',
  isLoading: false,

  getOfflineABC: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.ANALYTICS_OFFLINE_ABC);
    await set({
      defaultOfflineABCList: response.data.result,
      offlineABCList: response.data.result,
      labelText: response.data.label
    })
  }, set),

  getFilteredOfflineABC: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(`${Urls.ANALYTICS_OFFLINE_ABC}/filter/${withDate}/${byDate}`);
    await set({
      offlineABCList: response.data.result,
      labelText: response.data.label
    })
  }, set),

  setDefaultOfflineABC: (data) => {
    set({ offlineABCList: data })
  }
}));