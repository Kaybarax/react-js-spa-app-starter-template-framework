//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, {Component} from 'react';
import SafeComponentWrapper from "../app/safe-component-wrapper";
import {Helmet} from "react-helmet";

export default class AppDevScratchPad extends Component {
  static routeName = 'app-dev-scratchPad';
  static routePathPattern = '/app-dev-scratchPad';

  render() {
    return (
        <SafeComponentWrapper>

          <Helmet>
            <title>{' Mock Stuff Page '}</title>
          </Helmet>

          <div className="container is-fluid">


            <div className={'flex-row-container'}>
              <div className={'flex-container-child-item center-align-content'}>
                <h4 className="title is-5">
                  MOCK STUFF AWAY TO YOUR HEARTS DESIRE!!
                </h4>
              </div>
            </div>

            <div style={{paddingTop: 40}}>
              <button className="button" onClick={_ => {
                window.location.href = '/';
              }}>
                Go Home
              </button>
              <br/>
              <br/>
              <div>
                <form>
                  <label htmlFor={'mockFile'}>Mock file upload for example</label>
                  <br/>
                  <input
                      type={'file'}
                      id={'mockFile'}
                      name={'mockFile'}
                      multiple={'false'}
                  />
                  <br/>
                  <br/>
                  <button className="button" type={'button'} onClick={_ => {
                    // TODO: Call your 'mock file upload function'
                  }}>
                    Mock Upload
                  </button>
                </form>
                <br/>
              </div>
            </div>
            <div className="">&nbsp;</div>
          </div>

        </SafeComponentWrapper>
    );
  }
}
