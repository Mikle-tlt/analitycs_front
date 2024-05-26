import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useOnlineCustomersAnalytics = create((set) => ({
  month: [],
  customers: [],
  labelText: '',
  isLoading: false,

  getOnlineCustomers: withLoadingStateHandling(async (year) => {
    const response = await axiosPrivate.get(Urls.ANALYTICS_ONLINE_CUSTOMERS, { params: { year: year } });
    await set({
      month: response.data.month,
      customers: response.data.customers,
      labelText: response.data.labelText,
    })
  }, set),

  setDefaultOnlineCustomers: () => {
    set({
      month: [],
      customers: [],
      labelText: ''
    });
  }
}));