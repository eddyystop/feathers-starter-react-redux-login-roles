
// The logger expects the client config to have been already loaded
import { config } from '../utils/config';

var dispatch = null;
var logs = null;

export const logger = (level, msg, payload = {}) => {
  if (!dispatch || !logs) {
    throw new Error('loggerRedux.init must be called before loggerRedux.logger');
  }

  if (config && config.agent) { // just being careful
    payload.deviceId = config.agent.deviceId;
  }

  dispatch(logs.create({ level, msg, payload }))
    .catch(err => console.log('LoggerRedux error:', err.message));
};

export const initLogger = (storeDispatch, feathersServicesLogs) => {
  dispatch = storeDispatch;
  logs = feathersServicesLogs;
};
