// ===============
// CONFIGURE AXIOS
// ===============

// Configuring Axios in external module makes it easier to import into multiple components

import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000',
});
