export const createAPIAction = actionName => ({
  REQUEST: `${actionName}_REQUEST`,
  SUCCESS: `${actionName}_SUCCESS`,
  FAILURE: `${actionName}_FAILURE`
});
