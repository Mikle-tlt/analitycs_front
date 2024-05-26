export const withLoadingStateHandling  = (asyncFunction, set) => async (...args) => {
  try {
    set({ isLoading: true });
    const result = await asyncFunction(...args);
    return result;
  } catch (e) {
    throw e.response?.data;
  } finally {
    set({ isLoading: false });
  }
};