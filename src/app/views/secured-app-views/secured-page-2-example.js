//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import {Helmet} from "react-helmet";
import {TITLE} from "../../app-config";
import SecuredAppHeaderMenuNavigation from "../../routing-and-navigation/secured-app-header-menu-navigation";
import appNavigation from "../../routing-and-navigation/app-navigation";
import {persistStoreToLocalStorage} from "../../stores/store-utils";
import {useSelector} from "react-redux";

export default function SecuredPage2Example(props) {
    console.log('SecuredPage2Example props', props);

    const {
        appStore,
    } = useSelector(stores => stores);

    // because from this page, navigations will
    // be performed, init navigator with {history, location, match}
    // from props
    appNavigation.initNavigator(props);

    React.useEffect(() => {
        persistStoreToLocalStorage(appStore).then(null);
    });

    return (
        <React.Fragment>

            <Helmet>
                <title>{TITLE + ' | Secured Page 2'}</title>
            </Helmet>

            <SecuredAppHeaderMenuNavigation
                appStore={appStore}
            />

            <div className={'flex-row-container'}>
                <div className={'flex-container-child-item center-align-content'}>
                    <h5 className="title is-5">Secured Page 2 Example</h5>
                </div>
            </div>

            <div className={'flex-row-container'}>
                <div className={'flex-container-child-item center-align-content'}>
                    <p style={{textAlign: 'left'}}>
                        You have accessed another such page, only because you are logged in!
                    </p>
                </div>
            </div>

        </React.Fragment>
    );

}
