import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';

export const useReportStore = create((set) => ({
  reportData: {},
  isLoading: false,

  setReportData: (reportData) => {
    set({
      reportData
    });
  },
  generateReport: withLoadingStateHandling(async (report) => {
    await axiosPrivate.post(Urls.REPORT, report);
  }, set),
}));