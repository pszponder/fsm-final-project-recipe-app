// ===============
// CONFIGURE AXIOS
// ===============

// Configuring Axios in external module makes it easier to import into multiple components

import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000',
});
