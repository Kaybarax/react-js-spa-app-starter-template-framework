//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

export const APP_INDEXED_DB_DATASTORES = {
  USERS: 'USERS'
}

/**
 * sd _ Kaybarax with thanks to guidance by
 * Andy Haskell @_ https://medium.com/@AndyHaskell2013/build-a-basic-web-app-with-indexeddb-8ab4f83f8bda
 */
export const appIndexedDb = function () {

  console.log('Setup and/connect to indexedDb database');

  window.idxDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
      window.msIndexedDB;

  window.db = undefined;//avail globally through window
  let dbReq = window.idxDB.open('rjsmwspawlspfdDb', 3);
  dbReq.onupgradeneeded = function (event) {
    // Set the db variable to our database so we can use it!
    window.db = event.target.result;

    // Create an object store. Object stores
    // in databases are where data are stored.
    let users = window.db.createObjectStore(APP_INDEXED_DB_DATASTORES.USERS);
  }
  dbReq.onsuccess = function (event) {
    console.log('Connected to indexeddb database');
    window.db = event.target.result;
  }
  dbReq.onerror = function (event) {
    alert('Error opening indexedDb database ' + event.target.errorCode);
  }

}
