//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, {Component} from 'react';

export default class NotFound extends Component {

  static path = '/not-found';

  render() {
    return (
        <div className="container is-fluid">
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              <h1 className="title">
                Oops! Sorry, Page Not Found
              </h1>
            </div>
          </div>
          <div style={{paddingTop: 40}}>
            <a href={'/'}>
              <button className="button">
                Return >>
              </button>
            </a>
          </div>
          <div>
            <img src={require('../media/images/_404_.png')} alt={'404'}/>
          </div>
        </div>
    );
  }

}
