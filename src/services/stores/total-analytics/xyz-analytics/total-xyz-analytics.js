import { create } from 'zustand';
import { withLoadingStateHandling } from '../../../loading-handling';
import { axiosPrivate } from '../../../../utils';
import { Urls } from '../../../../constants';

export const useTotalXYZStore = create((set) => ({
  totalXYZList: [],
  labelText: '',
  isLoading: false,

  getTotalXYZ: withLoadingStateHandling(async (withDate, byDate) => {
    const response = await axiosPrivate.get(
      `${Urls.ANALYTICS_TOTAL_XYZ}/filter/${withDate}/${byDate}`);
    await set({
      totalXYZList: response.data.result,
      labelText: response.data.label
    })
  }, set),
}));