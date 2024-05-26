import { create } from 'zustand';
import { Urls } from '../../../../constants';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';

export const useOnlineSalesByCategoryAnalytics = create((set) => ({
  salesData: null,
  labelText: '',
  isLoading: false,

  getOnlineSalesByCategory: withLoadingStateHandling(
    async (categoryId, year) => {
      const response = await axiosPrivate.get(
        `${Urls.ANALYTICS_ONLINE_BY_CATEGORY}/${categoryId}/${year}`);
      await set({
        salesData: response.data.sales,
        labelText: response.data.labelText,
      })
    }, set),

  setDefaultSalesByCategory: () => {
    set({
      salesData: null,
      labelText: ''
    });
  }
}));