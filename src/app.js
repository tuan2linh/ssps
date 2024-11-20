import express from 'express';
import passport from 'passport';
import cors from 'cors';
import config from './config/config.js';
import jwtStrategy from './config/passport.js';
import routes from './routes/v1/index.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';

export const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);

// error handler middleware
app.use(globalErrorHandler);

console.log(config);
