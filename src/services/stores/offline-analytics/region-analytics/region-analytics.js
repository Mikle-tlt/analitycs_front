import { create } from 'zustand';
import { Urls } from '../../../../constants';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';

export const useOfflineRegionAnalytics = create((set) => ({
  regionData: null,
  data: [],
  labelText: '',
  isLoading: false,

  getOfflineSalesRegion: withLoadingStateHandling(async () => {
      const response = await axiosPrivate.get(Urls.ANALYTICS_OFFLINE_REGIONS);
      await set({
        regionData: response.data.regions,
        data: response.data.numbers,
        labelText: response.data.labelText,
      })
    }, set),
}));