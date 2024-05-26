import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useOnlineGrowthStore = create((set) => ({
  revenues: null,
  days: null,
  isLoading: false,
  labelText: '',

  getOnlineGrowth: withLoadingStateHandling(async (productId, withDate, byDate) => {
    const response = await axiosPrivate.get(
      `${Urls.ANALYTICS_ONLINE_GROWTH}/filter/${productId}/${withDate}/${byDate}`);
    await set({
      revenues: response.data.revenues,
      days: response.data.days,
      labelText: response.data.labelText,
    })
  }, set),

  setDefaultData: () => {
    set({
      revenues: null,
      days: null,
      labelText: ''
    })
  },
}));