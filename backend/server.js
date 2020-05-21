const app = require('./app');
const { port, dbURI } = require('./config/environment');
const mongoose = require('mongoose');

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(dbURI, mongooseConfig, (err) => {
    if (err) return console.log('app in index cannot connect to mongodb', err);
    console.log(`Mongo is connected to '${dbURI}'`);
  });
  app.listen(port, () =>
    console.log(`Express app listening at http://localhost:${port}`)
  );
}
