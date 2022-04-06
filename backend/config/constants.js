// Constants for Tokens
const MAX_AGE_ACCESS_TOKEN = '30s';
const MAX_AGE_REFRESH_TOKEN = 1 * 24 * 60 * 60 * 1000; // days in milliseconds
const MAX_AGE_REFRESH_TOKEN_COOKIE = MAX_AGE_REFRESH_TOKEN;

// Export Constants
module.exports = {
  MAX_AGE_ACCESS_TOKEN,
  MAX_AGE_REFRESH_TOKEN,
  MAX_AGE_REFRESH_TOKEN_COOKIE,
};
