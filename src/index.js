import mongoose from 'mongoose';
import { app } from './app.js';
import config from './config/config.js';
import logger from './config/logger.js';

let server;
mongoose
  .connect(config.mongoose.uri, {
    dbName: config.mongoose.db_name,
    user: config.mongoose.db_user,
    pass: config.mongoose.db_pass
  })
  .then(() => {
    if (Number(mongoose.connection.readyState) != 1) {
      console.log('Connected Failed');
    } else {
      console.log('Connected to Database Successfully');
    }
    server = app.listen(config.port, () => {
      logger.info(`Listening to port on http://${config.hostName}:${config.port}/v1`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
