/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { HeaderMenuNavigation } from '../routing-and-navigation/header-menu-navigation';
import { Helmet } from 'react-helmet';
import { TITLE } from '../app-config';
import { PAGE4EXAMPLE_VIEW_ROUTE } from '../routing-and-navigation/views-routes-declarations';
import WithStoresHoc from '../stores/with-stores-hoc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Page3Example(props: any) {
  console.log('Page3Example props', props);

  const { appStore } = props;

  // because from this page, navigations will
  // be performed, init navigator with {history, location, match}
  // from props
  // appNavigation.initNavigator(props);

  const _continueToPage4 = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    // appNavigation.navigateToPage4Example();
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE + ' | Page 3'}</title>
      </Helmet>
      <HeaderMenuNavigation appStore={appStore} />

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h5 className="title is-5">Page 3 Example : All batteries included, and all the whistles and bells!</h5>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <p style={{ textAlign: 'left' }}>
            <h4>So, what's under the hood!!</h4>
            <strong>State/Stores Manager:</strong>
            <br />
            The extremely, philosophically, and amazingly powerful MobX.
            <br />
            You can read more about{' '}
            <a href={'https://twitter.com/mweststrate'} target={'_blank'}>
              Michel Weststrate's
            </a>{' '}
            powerful MobX&nbsp; state manager creation, here,{' '}
            <a href={'https://mobx-state-tree.js.org/intro/philosophy'} target={'_blank'}>
              About MobX
            </a>
            <br />
            As mentioned earlier, currently, the system design persists your running app's state/stores to,{' '}
            <i>localStorage</i>,&nbsp; Web Storage, but you can upgrade to <i>IndexedDb</i> if you are dealing with
            heavy data. I have already&nbsp; implemented IndexedDb in some parts of the system, so you have a point of
            reference to pick up from.
            <br />
            <br />
            <strong>Router for routing and navigation:</strong>
            <br />
            Keeping with the beloved, extremely, philosophically, and amazingly powerful MobX, my routing and&nbsp;
            navigation logic and design, is wrapped around <i>MobX State Router</i> created by&nbsp;
            <a href={'https://twitter.com/NareshJBhatia'} target={'_blank'}>
              Naresh Bhatia
            </a>
            . You can see&nbsp;more about it here,&nbsp;
            <a href={'https://nareshbhatia.github.io/mobx-state-router/docs/guides-getting-started'} target={'_blank'}>
              About MobX State Router
            </a>
            <br />
            <br />
            <strong>And there you have it folks:</strong>
            <br />
            So, Come up with frontend application design architecture from experience, over the years;&nbsp; get those
            components above, and put them together with React js; and you have an all batteries included,&nbsp; shiny
            whistles and bells, React Js SPA web app template framework to start you off to build, both your web
            app&nbsp; that facilitates a secure app with sign up, login and authentication; or even a static web app
            like&nbsp; you would get with Gatsby Js or Next Js, the only difference being that those are Server Side
            Rendered&nbsp; (SSR) while this is an all frontend side, single package packaged SPA.
            <br />
            This current design mode is for an SPA with built in <i>Login and Sign Up</i> facilities for a&nbsp; secured
            web app. Next up after this, one for a completely unsecured web app from the start, for your&nbsp; unsecured
            web app static site starter; it will still have the facilities for setting up login and&nbsp; sign up like
            in this design, so you can convert it for that use case if you wish.&nbsp; And you can also, of course,
            tweak and turn off the,&nbsp; login and sign up, facilities in this web app template framework if you wish,
            and just use it as an, unsecured&nbsp; SPA web app, static site generator.
            <br />
            <br />
            And now!
            <br />
            <br />
            <a href={PAGE4EXAMPLE_VIEW_ROUTE.path} onClick={e => _continueToPage4(e)}>
              On to the credits, S/O and wrap up ... Continue to Page 4 Example...
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

const EnhancedPage3Example = WithStoresHoc(Page3Example, ['page3ExampleStore', 'appStore']);
export default EnhancedPage3Example;
