import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const winstonConfig = {
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        }),
      ),
    }),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      frequency: '1d',
      level: 'info',
    }),
    // new DailyRotateFile({
    //   filename: 'logs/error-%DATE%.log',
    //   datePattern: 'YYYY-MM-DD',
    //   maxFiles: '14d',
    //   level: 'error',
    // }),
  ],
};

export const logger = winston.createLogger(winstonConfig);
