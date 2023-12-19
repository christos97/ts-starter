import chalk from 'chalk';

import env from '@/env';

const LogLevel = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;
type LogLevel = keyof typeof LogLevel;
type LogLevelValue = (typeof LogLevel)[LogLevel];

const LogLevelColor = {
  error: 'red',
  warn: 'yellow',
  info: 'greenBright',
  debug: 'cyanBright',
} as const;
type LogLevelColor = (typeof LogLevelColor)[LogLevel];

const ctxColor = 'magentaBright';

interface LoggerOptions {
  context: string;
  logLevel: LogLevel;
}

const createLogger = ({ context, logLevel }: LoggerOptions) => {
  let currentLogLevel: LogLevel = logLevel;

  const getLogLevelValue = (level: LogLevel): LogLevelValue => LogLevel[level];

  const formatMessage = (message: string, level: LogLevel = 'debug'): string =>
    chalk[LogLevelColor[level]](`Level: [${level}]\n`) +
    chalk[ctxColor](`Context: [${context}]\n`) +
    chalk.white(`Message: ${message} \n`);

  // eslint-disable-next-line no-unused-vars
  const log = (message: string, level: LogLevel, consoleFn: (msg: string) => void): void => {
    if (getLogLevelValue(currentLogLevel) >= getLogLevelValue(level)) {
      consoleFn(formatMessage(message, level));
    }
  };

  return {
    setLogLevel: (level: LogLevel): void => {
      currentLogLevel = level;
    },
    setContext: (ctx: string): void => {
      context = ctx;
    },
    debug: (message: string): void => log(chalk.cyanBright(message), 'debug', console.debug),
    info: (message: string): void => log(chalk.greenBright(message), 'info', console.info),
    warn: (message: string): void => log(chalk.yellow.bold(message), 'warn', console.warn),
    error: (message: string, err?: unknown): void => {
      if (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        log(chalk.red.bold(message) + `\nStack: ${e.stack}`, 'error', console.error);
      }
    },
  } as const;
};

const logger = createLogger({
  context: 'DEFAULT',
  logLevel: env.CI ? 'info' : 'debug',
});
type logger = ReturnType<typeof createLogger>;

export default logger;
export type { logger as Logger };
