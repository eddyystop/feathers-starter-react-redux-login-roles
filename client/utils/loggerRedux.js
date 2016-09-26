
// The logger expects the client config to have been already loaded
import { config } from '../utils/config';

var dispatch = null; // eslint-disable-line no-var
var logs = null; // eslint-disable-line no-var

export const logger = (level, msg, payload = {}) => {
  if (!dispatch || !logs) {
    throw new Error('loggerRedux.init must be called before loggerRedux.logger');
  }

  if (config && config.agent) { // just being careful
    payload.deviceId = config.agent.deviceId; // eslint-disable-line no-param-reassign
  }

  dispatch(logs.create({ level, msg, payload }))
    .catch(err => console.log('LoggerRedux error:', err.message)); // eslint-disable-line no-console
};

export const initLogger = (storeDispatch, feathersServicesLogs) => {
  dispatch = storeDispatch;
  logs = feathersServicesLogs;
};
