import { create } from 'zustand';
import { Urls } from '../../../../constants';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';

export const useOnlineRegionAnalytics = create((set) => ({
  regionData: null,
  data: [],
  labelText: '',
  isLoading: false,

  getOnlineSalesRegion: withLoadingStateHandling(async () => {
      const response = await axiosPrivate.get(Urls.ANALYTICS_ONLINE_REGIONS);
      await set({
        regionData: response.data.regions,
        data: response.data.numbers,
        labelText: response.data.labelText,
      })
    }, set),
}));