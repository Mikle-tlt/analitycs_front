import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useOnlineXYZStore = create((set) => ({
  onlineXYZList: [],
  labelText: '',
  isLoading: false,

  getOnlineXYZ: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(
      `${Urls.ANALYTICS_ONLINE_XYZ}/filter/${withDate}/${byDate}`);
    await set({
      onlineXYZList: response.data.result,
      labelText: response.data.label
    })
  }, set),
}));