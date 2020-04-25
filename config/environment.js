const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;
const dbURI =
  process.env.MONGODB_URI || `mongodb://localhost/calendar-journal-${env}`;
const secret = process.env.SECRET || 'jwtsecret';

module.exports = {
  port,
  dbURI,
  secret
};
