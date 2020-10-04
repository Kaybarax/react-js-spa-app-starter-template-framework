//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {RouterState, RouterStore} from 'mobx-state-router';
import AppStores from './app-stores';
import {AppAuth} from './app-auth';
import {routes} from '../routing-and-navigation/routes';
import NotFound from "../views/not-found";

const notFound = new RouterState(NotFound.routeName);

/**
 * sd _ Kaybarax
 */
export default class RootStore {
  appStores = new AppStores();
  //support stuff
  appAuth = new AppAuth(this);
  router = new RouterStore(this, routes, notFound);
}
