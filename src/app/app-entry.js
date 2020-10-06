//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {AppBaseRoutingComposition} from "./routing-and-navigation/routes";
import FallBackPage from "./fall-back-page";


export default function AppEntry(props) {
  console.log('AppEntry props', props);

  return (
      <React.Fragment>
        <Router>
          <React.Suspense fallback={<FallBackPage/>}>
            <AppBaseRoutingComposition/>
          </React.Suspense>
        </Router>
      </React.Fragment>
  );
}
