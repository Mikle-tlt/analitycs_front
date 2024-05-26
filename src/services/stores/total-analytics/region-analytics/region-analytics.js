import { create } from 'zustand';
import { Urls } from '../../../../constants';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';

export const useTotalRegionAnalytics = create((set) => ({
  regionData: null,
  data: [],
  labelText: '',
  isLoading: false,

  getTotalSalesRegion: withLoadingStateHandling(async () => {
      const response = await axiosPrivate.get(Urls.ANALYTICS_TOTAL_REGIONS);
      await set({
        regionData: response.data.regions,
        data: response.data.numbers,
        labelText: response.data.labelText,
      })
    }, set),
}));