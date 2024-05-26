import { create } from 'zustand';
import { Urls } from '../../../../constants';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';

export const useOfflineAssortmentAnalytics = create((set) => ({
  pointsData: [],
  data: [],
  isLoading: false,

  getOfflineAssortment: withLoadingStateHandling(async () => {
      const response = await axiosPrivate.get(Urls.ANALYTICS_OFFLINE_ASSORTMENT);
      await set({
        pointsData: response.data.points,
        data: response.data.numbers,
      })
    }, set),
}));