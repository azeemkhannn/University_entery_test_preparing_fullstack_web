import config from '../config/env.js';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

class Logger {
  constructor() {
    this.level = config.logLevel;
  }

  error(message, ...args) {
    if (logLevels[this.level] >= logLevels.error) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  warn(message, ...args) {
    if (logLevels[this.level] >= logLevels.warn) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  info(message, ...args) {
    if (logLevels[this.level] >= logLevels.info) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  debug(message, ...args) {
    if (logLevels[this.level] >= logLevels.debug) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

export default new Logger();