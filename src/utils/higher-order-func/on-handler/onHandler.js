export const onHandler = (asyncFunction, errorFunction) => async (e, ...args) => {
  try {
    await asyncFunction(e, ...args);
  } catch (error) {
    errorFunction(error);
  }
};