import { create } from 'zustand';
import { Urls } from '../../../../constants';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';

export const useTotalProfitabilityStore = create((set) => ({
  profitabilityData: [],
  labelText: '',
  isLoading: false,

  getTotalProfitability: withLoadingStateHandling(
    async (dateWithF, dateByF, dateWithS, dateByS) => {
    const response = await axiosPrivate.get(
      `${Urls.ANALYTICS_TOTAL_PROFITABILITY}/filter/${dateWithF}/${dateByF}/${dateWithS}/${dateByS}`);
    await set({
      profitabilityData: response.data.result,
      labelText: response.data.label,
    })
  }, set),

  setDefaultProfitability: () => {
    set({
      profitabilityData: [],
      labelText: ''
    });
  }
}));