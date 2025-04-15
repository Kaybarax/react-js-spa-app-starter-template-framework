/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppBaseRoutingComposition } from './routing-and-navigation/routing-composition';
import LoadingRouteFallback from './loading-route-fallback';
import SafeComponentWrapper from './safe-component-wrapper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AppEntry(props: any) {
  console.log('AppEntry props', props);

  return (
    <Router>
      <React.Suspense fallback={<LoadingRouteFallback />}>
        <SafeComponentWrapper>
          <AppBaseRoutingComposition />
        </SafeComponentWrapper>
      </React.Suspense>
    </Router>
  );
}
