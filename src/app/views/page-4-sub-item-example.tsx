/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { TITLE } from '../app-config';
import { isNullUndefined } from '../util/util';
import { SOs_and_Credits_List } from '../app-management/data-manager/list-manager';
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WithStoresHoc from '../stores/with-stores-hoc';
import { HeaderMenuNavigation as BaseHeaderMenuNavigation } from '../routing-and-navigation/header-menu-navigation';

// Create a wrapped version with store injection
const HeaderMenuNavigation = WithStoresHoc(BaseHeaderMenuNavigation, ['appStore']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Page4SubItemExample(props: any) {
  console.log('Page4SubItemExample props', props);

  const { appStore } = props;

  const { item } = useParams();

  const person = SOs_and_Credits_List.find(it => it.person === item);

  if (isNullUndefined(person)) {
    return (
      <React.Fragment>
        <Helmet>
          <title>{TITLE + ' | Page 4 Sub-item Example '}</title>
        </Helmet>
        <div className="container is-fluid">
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              <h5 className="title is-5">No user details</h5>
            </div>
          </div>

          <div>
            <a
              className="button is-info"
              onClick={() => {
                // appNavigation.navigateToPage4Example(router);
              }}
            >
              Go back
            </a>
          </div>
          <br />
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE + ' | Page 4 Sub-item Example '}</title>
      </Helmet>
      <HeaderMenuNavigation appStore={appStore} />

      <div className="container is-fluid">
        <div className={'flex-row-container'}>
          <div className={'flex-container-child-item center-align-content'}>
            <h5 className="title is-5">Page 4 Item Example : Accredited Details</h5>
          </div>
        </div>

        <div className="columns">
          <div className="column is-full is-primary">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src={import.meta.url.replace(/\/[^/]*$/, '/media/images/image.png')}
                    alt="Placeholder image"
                  />{' '}
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src={require('../media/images/image.png')} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{person?.person}</p>
                    <p className="subtitle is-6">
                      <a href={person?.links[0].link} target={'_blank'}>
                        @{person?.links[0].site}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="content">
                  {person?.attribution}&nbsp;
                  <br />
                  <a href={person?.links[1].link} target={'_blank'}>
                    {person?.links[1].site}
                  </a>
                  <hr />
                  Touch-ups here with{' '}
                  <a href={'https://bulma.io'} target={'_blank'}>
                    @bulmaio
                  </a>
                  &nbsp;
                  <a href="">#css</a> <a href="">#responsive</a>&nbsp;
                  <a className="button is-small">
                    <FontAwesomeIcon icon={faCoffee} />
                  </a>
                  <br />
                  <time dateTime={new Date().toLocaleDateString()}>{new Date().toLocaleDateString()}</time>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a
            className="button is-info"
            onClick={_ => {
              // appNavigation.navigateToPage4Example(router);
            }}
          >
            Go back
          </a>
        </div>
        <br />
      </div>
    </React.Fragment>
  );
}

const EnhancedPage4SubItemExample = WithStoresHoc(Page4SubItemExample, ['page4ExampleStore', 'appStore']);
export default EnhancedPage4SubItemExample;
