//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import React, {Fragment} from 'react';
import {RouterView} from 'mobx-state-router';
import {APPLICATION_VIEWS, viewMapBuilder} from "./routing-and-navigation/views-routes-exports";
import {appIndexedDb} from "./app-management/data-manager/indexeddb-manager";


export default function AppEntry(props) {

  //init app indexed db
  appIndexedDb();

  const viewMap = viewMapBuilder(APPLICATION_VIEWS);

  return (
      <Fragment>
        <RouterView routerStore={props.router} viewMap={viewMap}/>
      </Fragment>
  );
}

// export default (WithStoresHoc(AppEntry, ['router']));
