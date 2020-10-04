//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {HistoryAdapter} from 'mobx-state-router';
import {createBrowserHistory} from 'history';
import RootStore from './root-store';

const rootStore = new RootStore();

// Observer of history changes
const historyAdapter = new HistoryAdapter(
    rootStore.router,
    createBrowserHistory(),
);
historyAdapter.observeRouterStateChanges();

export default rootStore;
