//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import React from "react";
import {inject, observer} from "mobx-react";
import SafeComponentWrapper from "../../safe-component-wrapper";
import NavigationHeader from "../../shared-components-and-modules/navigation-header";
import {Helmet} from "react-helmet";
import {TITLE} from "../../app-config";
import {isNullUndefined} from "../../util/util";
import {SOs_and_Credits_List} from "../../app-management/data-manager/list-manager";
import {faCoffee} from "@fortawesome/free-solid-svg-icons/faCoffee";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import appNavigation from "../../routing-and-navigation/app-navigation";

function Page4SubItemExample() {

  const loginStore = this.props.authStore.login;
  const appStore = this.props.appStore;
  const authStore = this.props.authStore;
  const routerStore = this.props.routerStore;

  const routeName = 'Page4Item';
  const routePathPattern = '/Page4Item/:item';

  let {item} = this.routerStore.routerState.params;
  let person = SOs_and_Credits_List.find(it => it.person === item);

  if (isNullUndefined(person)) {
    return (
        <SafeComponentWrapper>
          <Helmet>
            <title>{TITLE + ' | Page 4 Sub-item Example '}</title>
          </Helmet>
          <div className="container is-fluid">

            <div className={'flex-row-container'}>
              <div className={'flex-container-child-item center-align-content'}>
                <h5 className="title is-5">
                  No user details
                </h5>
              </div>
            </div>

            <div>
              <a className="button is-info" onClick={_ => {
                appNavigation.navigateToPage4Example(routerStore);
              }}>Go back</a>
            </div>
            <br/>
          </div>
        </SafeComponentWrapper>
    )
  }

  return (
      <SafeComponentWrapper>
        <Helmet>
          <title>{TITLE + ' | Page 4 Sub-item Example '}</title>
        </Helmet>
        <NavigationHeader
            routerStore={routerStore}
            authStore={authStore} activity={this}
        />

        <div className="container is-fluid">

          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              <h5 className="title is-5">
                Page 4 Item Example : Accredited Details
              </h5>
            </div>
          </div>

          <div className="columns">
            <div className="column is-full is-primary">

              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={require("../../media/images/image.png")}
                         alt="Placeholder image"/>
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src={require("../../media/images/image.png")}
                             alt="Placeholder image"/>
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{person.person}</p>
                      <p className="subtitle is-6">
                        <a href={person.links[0].link} target={'_blank'}>@{person.links[0].site}</a>
                      </p>
                    </div>
                  </div>

                  <div className="content">
                    {person.attribution}&nbsp;<br/>
                    <a href={person.links[1].link} target={'_blank'}>{person.links[1].site}</a>
                    <hr/>
                    Touch-ups here with <a href={'https://bulma.io'} target={'_blank'}>@bulmaio</a>&nbsp;
                    <a href="">#css</a> <a href="">#responsive</a>&nbsp;
                    <a className="button is-small">
                      <FontAwesomeIcon icon={faCoffee}/>
                    </a>
                    <br/>
                    <time dateTime={(new Date()).toLocaleDateString()}>
                      {(new Date()).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div>
            <a className="button is-info" onClick={_ => {
              appNavigation.navigateToPage4Example(routerStore);
            }}>Go back</a>
          </div>
          <br/>

        </div>

      </SafeComponentWrapper>
  );

}

export default (inject('authStore', 'appStore', 'routerStore')(observer(Page4SubItemExample)));
