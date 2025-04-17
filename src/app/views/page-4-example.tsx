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
import { isEmptyArray } from '../util/util';
import { SOs_and_Credits_List } from '../app-management/data-manager/list-manager';
import { useAppStore } from '../stores';
import imagePlaceholder from '../media/images/image.png';
import shortParagraphImage from '../media/images/short-paragraph.png';
import { appNavigation, AppRoutes } from '../routing-and-navigation/app-navigation';

export default function Page4Example() {
  // Get stores directly from hooks
  const appStore = useAppStore();
  console.log('Page4Example appStore', appStore);

  // because from this page, navigations will
  // be performed, init navigator with {history, location, match}
  // from props
  // appNavigation.initNavigator(props);

  const _viewAttributedPersonDetails = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    person: string,
  ) => {
    console.log('person', person);
    e.preventDefault();

    // Navigate to the Page4SubItemExample route with the person parameter
    // The route is defined as `${PAGE4EXAMPLE_VIEW_ROUTE.path}/:item`
    const path = `${AppRoutes.PAGE4}/${person}`;
    appNavigation.navigateTo(path);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE + ' | Page4'}</title>
      </Helmet>
      <HeaderMenuNavigation appStore={appStore} />

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h5 className="title is-5">Page 4 Example : About me, and S/Os and credits</h5>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <p style={{ textAlign: 'left' }}>
            <strong>About me:</strong>
            <br />
            Hi. I'm Kevin. A full stack software engineer currently based in my hometown and&nbsp; country, Nairobi,
            Kenya. At this time of this build and writing (May, 2020), I have 3 and&nbsp;a half years of professional
            (hired) software engineering experience, and 5 to 6 yrs of&nbsp; total software engineering experience, both
            professionally and personally.
            <br />
            I'm especially, particularly well versed with <i>Java</i>, <i>SQL (MySQL/OracleSQL)</i>,&nbsp;
            <i>Javascript and web technologies</i>, <i>Mobile app development with React Native and Android</i>,&nbsp;
            and I have, and can as well work with other languages and technologies like&nbsp;
            <i>Python, C++, C#, Dart, NoSQL Dbs, and AWS cloud</i>.
            <br />
            <br />
            <strong>Let's connect:</strong>
            <br />
            LinkedIn:{' '}
            <a href={'https://linkedin.com/in/kaybarax'} target={'_blank'}>
              Kevin Barasa (kaybarax)
            </a>
            <br />
            Github:{' '}
            <a href={'https://github.com/Kaybarax'} target={'_blank'}>
              Kaybarax
            </a>
            <br />
            Twitter:{' '}
            <a href={'https://twitter.com/Kaybarax'} target={'_blank'}>
              Kaybarax
            </a>
          </p>

          <div style={{ textAlign: 'left' }}>
            <strong>Shout out's and credits:</strong>
            <br />
            <div className="flex-column-container">
              {!isEmptyArray(SOs_and_Credits_List) &&
                SOs_and_Credits_List.map((item, i) => {
                  return (
                    <div key={i} className="flex-container-child-item-full-width">
                      <div className="flex-fluid-row-container">
                        <div className="flex-container-child-item-one-quarter-width">
                          <div className="">
                            <figure>
                              <img
                                src={imagePlaceholder}
                                alt={'alt'}
                                style={{
                                  width: 96,
                                  height: 96,
                                }}
                              />
                              <figcaption>
                                <a
                                  href={item.links[0].link}
                                  target={'_blank'}
                                  onClick={e => _viewAttributedPersonDetails(e, item.person)}
                                >
                                  {item.person}
                                </a>
                              </figcaption>
                            </figure>
                          </div>
                        </div>
                        <div className="flex-container-child-item-one-quarter-width">
                          <div className="">
                            A little about {item.person}, click to view full details
                            <img
                              src={shortParagraphImage}
                              alt={'alt'}
                              style={{
                                width: 520,
                                height: 84,
                                cursor: 'pointer',
                              }}
                              onClick={e => _viewAttributedPersonDetails(e, item.person)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
