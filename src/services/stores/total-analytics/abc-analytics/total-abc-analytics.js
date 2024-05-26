import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useTotalABCStore = create((set) => ({
  defaultTotalABCList: [],
  totalABCList: [],
  labelText: '',
  isLoading: false,

  getTotalABC: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.ANALYTICS_TOTAL_ABC);
    await set({
      defaultTotalABCList: response.data.result,
      totalABCList: response.data.result,
      labelText: response.data.label
    })
  }, set),

  getFilteredTotalABC: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(`${Urls.ANALYTICS_TOTAL_ABC}/filter/${withDate}/${byDate}`);
    await set({
      totalABCList: response.data.result,
      labelText: response.data.label
    })
  }, set),

  setTotalABC: (data) => {
    set({ totalABCList: data })
  }
}));