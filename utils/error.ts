import log4js from 'log4js';

const crashDown = (info: { message: string }) => {
  log4js.getLogger().error(info.message);
  process.exit(1);
};
