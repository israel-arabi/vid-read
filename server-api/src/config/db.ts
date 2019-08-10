import mongoose = require('mongoose');

const getConnectionString = () => 'mongodb://localhost/vid-read';

export const connectToDb = async () => {
  const promise = mongoose.connect(getConnectionString());
  mongoose.connection.on('error', (err) => {
    console.log('err', err);
  });
  return promise;
  // mongoose.set('debug', true);
};
