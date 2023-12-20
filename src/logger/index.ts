import chalk, { type ColorName } from 'chalk';
import { existsSync, mkdirSync, appendFile } from 'fs';
import { join } from 'path';

import env from '@/env';

const LogLevel = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;
type LogLevel = keyof typeof LogLevel;
type LogLevelValue = (typeof LogLevel)[LogLevel];

const LogLevelColor: Record<LogLevel, ColorName> = {
  error: 'red',
  warn: 'yellow',
  info: 'greenBright',
  debug: 'cyanBright',
};

type LogFormat = 'context' | 'details' | 'message';

const LogFormatColor: Record<LogFormat, ColorName> = {
  context: 'magentaBright',
  details: 'yellowBright',
  message: 'blueBright',
};

interface LoggerOptions {
  context: string;
  logLevel: LogLevel;
}

const createLogger = ({ context, logLevel }: LoggerOptions) => {
  let currentLogLevel: LogLevel = logLevel;

  const getLogLevelValue = (level: LogLevel): LogLevelValue => LogLevel[level];

  const formatMessage = (message: string, level: LogLevel, details?: unknown): string =>
    chalk[LogLevelColor[level]](`Level: [${level}]\n`) +
    chalk[LogFormatColor.context](`Context: [${context}]\n`) +
    chalk[LogFormatColor.message](`Message: ${chalk.white(message)} \n`) +
    chalk[LogFormatColor.details](
      `Details: ${chalk.white(
        typeof details === 'object' ? JSON.stringify(details, null, 2) : String(details),
      )}`,
    );

  const writeLog = (message: string, level: LogLevel, details?: unknown): void => {
    const logsDir = join(process.cwd(), 'logs');
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir);
    }
    appendFile(
      join(logsDir, `${context}-${level}-${new Date().toISOString()}.log`),
      formatMessage(message, level, details),
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
  };

  // eslint-disable-next-line no-unused-vars
  const log = (
    message: string,
    level: LogLevel,
    consoleFn: (msg: string) => void,
    details?: unknown,
  ): void => {
    if (getLogLevelValue(currentLogLevel) >= getLogLevelValue(level)) {
      consoleFn(formatMessage(message, level, details));
      writeLog(message, level, details);
    }
  };

  return {
    setLogLevel: (level: LogLevel): void => {
      currentLogLevel = level;
    },
    setContext: (ctx: string): void => {
      context = ctx;
    },
    debug: (message: string, details?: unknown): void => log(message, 'debug', console.debug, details), // prettier-ignore
    info: (message: string, details?: unknown): void => log(message, 'info', console.info, details),
    warn: (message: string, details?: unknown): void => log(message, 'warn', console.warn, details),
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
