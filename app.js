const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use((req, _, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, _, res, next) => {
  return res.status(err.status || 500).json({ error: err.message });
});

app.listen(app.get('port'), () => {
  console.log(`listening.... 🦻http://localhost:${app.get('port')}`);
});
