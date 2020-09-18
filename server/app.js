require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const express = require('express');
const app = express();

const port = process.env.SERVER_PORT || 3000;
const production = (process.env.PRODUCTION === 'true');
const staticDistRoot = path.join(__dirname, '../', 'dist', 'UrlShortener');

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

if (production) {
  mongoose.connect(process.env.PROD_DATABASE_URL, options);
} else {
  mongoose.connect(process.env.DEV_DATABASE_URL, options);
}

mongoose.connection.on('connected', function () {
  if (production) {
    console.log('Mongoose connection open to ' + process.env.PROD_DATABASE_URL);
  } else {
    console.log('Mongoose connection open to ' + process.env.DEV_DATABASE_URL);
  }
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

const corsOptions = {
  origin: 'https://urlshortener.mathieulussier.ca/',
  optionsSuccessStatus: 200
};

app.use(helmet());
if (production) {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('dev'));

app.use(express.static(staticDistRoot));

app.get('/', (req, res, next) => {
  res.status(200).sendFile(path.resolve(`${staticDistRoot}\\index.html`));
});

app.use(require('./routes/shortener.route'));

app.all("*", function(req, res) {
  return res.status(404).json({
    status: 404,
    message: 'Not Found !'
  });
});

app.use((err, req, res) => {
  if(err.name === "UnauthorizedError"){
    return res.status(401).json({
      status: 401,
      message: err.message
    });
  }
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}`)
});

