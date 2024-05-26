import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useOnlineABCStore = create((set) => ({
  defaultOnlineABCList: [],
  onlineABCList: [],
  labelText: '',
  isLoading: false,

  getOnlineABC: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.ANALYTICS_ONLINE_ABC);
    await set({
      defaultOnlineABCList: response.data.result,
      onlineABCList: response.data.result,
      labelText: response.data.label
    })
  }, set),

  getFilteredOnlineABC: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(`${Urls.ANALYTICS_ONLINE_ABC}/filter/${withDate}/${byDate}`);
    await set({
      onlineABCList: response.data.result,
      labelText: response.data.label
    })
  }, set),

  setOnlineABC: (data) => {
    set({ onlineABCList: data })
  }
}));