import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useOfflineXYZStore = create((set) => ({
  offlineXYZList: [],
  labelText: '',
  isLoading: false,

  getOfflineXYZ: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(
      `${Urls.ANALYTICS_OFFLINE_XYZ}/filter/${withDate}/${byDate}`);
    await set({
      offlineXYZList: response.data.result,
      labelText: response.data.label
    })
  }, set),
}));