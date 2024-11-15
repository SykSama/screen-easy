import type { Logger } from "pino";
import pino from "pino";

export const logger: Logger =
  process.env.NODE_ENV === "production"
    ? // JSON in production
      pino({ level: "silent" })
    : // Pretty print in development
      pino({
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
        level: "debug",
      });
