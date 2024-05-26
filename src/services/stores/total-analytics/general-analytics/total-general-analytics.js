import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useTotalGeneralStore = create((set) => ({
  defaultTotalGeneralList: [],
  totalGeneralList: [],
  isLoading: false,

  getTotalGeneral: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.ANALYTICS_TOTAL_GENERAL);
    await set({
      defaultTotalGeneralList: response.data,
      totalGeneralList: response.data
    })
  }, set),

  getFilteredTotalGeneral: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(`${Urls.ANALYTICS_TOTAL_GENERAL}/filter/${withDate}/${byDate}`);
    await set({ totalGeneralList: response.data })
  }, set),

  setTotalGeneral: (data) => {
    set({ totalGeneralList: data })
  }
}));