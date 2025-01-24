import createError from 'http-errors'
import express from 'express'
import path, {dirname} from 'path' 
import logger from 'morgan'
import { fileURLToPath } from 'url'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import storesRouter from './routes/stores.js'
import itemsRouter from './routes/items.js'
import reviewsRouter from './routes/reviews.js'
import promotionsRouter from './routes/promotions.js'
import { authenticate } from './controllers/AuthController.js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authenticate)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/stores', storesRouter);
app.use('/reviews', reviewsRouter);
app.use('/promotions', promotionsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.json({'error': err.message});
});

export {
  __dirname
}
export default app;
