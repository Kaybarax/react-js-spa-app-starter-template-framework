/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import appStores from './app-stores';

// Call loadAppStores to initialize the stores
appStores.loadAppStores().catch(err => {
  console.error('Failed to load app stores:', err);
});

export default appStores;
