/* eslint-disable no-console */
const errorPrefix = "tsParticles - Error";

interface ILogger {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  debug(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  error(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  info(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  log(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  trace(this: void, ...data: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  verbose(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  warning(this: void, message?: unknown, ...optionalParams: unknown[]): void;
}

const wrap =
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    <T extends unknown[]>(fn: (this: void, ...args: T) => void) =>
      (...args: T): void => {
        fn(...args);
      },
  _logger: ILogger = {
    debug: wrap(console.debug),

    error: (message?: unknown, ...optionalParams: unknown[]) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`${errorPrefix} - ${message}`, ...optionalParams);
    },

    info: wrap(console.info),
    log: wrap(console.log),
    trace: wrap(console.trace),
    verbose: wrap(console.log),
    warning: wrap(console.warn),
  };

/**
 * Replaces the library log functions with a custom one.
 * @param logger - A logger object responsible for logging messages.
 */
export function setLogger(logger: Partial<ILogger>): void {
  if (logger.debug) {
    _logger.debug = wrap(logger.debug);
  }

  if (logger.error) {
    _logger.error = wrap(logger.error);
  }

  if (logger.info) {
    _logger.info = wrap(logger.info);
  }

  if (logger.log) {
    _logger.log = wrap(logger.log);
  }

  if (logger.trace) {
    _logger.trace = wrap(logger.trace);
  }

  if (logger.verbose) {
    _logger.verbose = wrap(logger.verbose);
  }

  if (logger.warning) {
    _logger.warning = wrap(logger.warning);
  }
}

/**
 * Returns the logger object.
 * @returns the logger
 */
export function getLogger(): ILogger {
  return _logger;
}
