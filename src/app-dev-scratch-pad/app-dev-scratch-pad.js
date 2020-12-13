//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import SafeComponentWrapper from "../app/safe-component-wrapper";
import {Helmet} from "react-helmet";
import {persistStoreToLocalStorage} from "../app/stores/store-utils";
import APP_ACTIONS from "../app/controllers/app-controller";
import {storeUpdateDispatch} from "../app/stores/stores-hocs";

export default function AppDevScratchPad(props) {
    console.log('AppDevScratchPad props', props);

    const store = useSelector(stores => stores);
    const dispatcher = useDispatch();

    console.log('AppDevScratchPad STORE', store);
    const {appStore} = store;
    console.log('AppDevScratchPad appStore', appStore);

    React.useEffect(() => {
        persistStoreToLocalStorage(appStore).then(null);
    });

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

                    <button
                        className="button"
                        onClick={_ => {
                            window.location.href = '/';
                        }}
                    >
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
                            <button
                                className="button" type={'button'}
                                onClick={_ => {
                                    // TODO: Call your 'mock file upload function'
                                }}
                            >
                                Mock Upload
                            </button>
                        </form>
                        <br/>
                    </div>

                    <br/>

                    <p>
                        <h2>Try a store update with counting clicks</h2>
                        <button
                            onClick={_ => {
                                storeUpdateDispatch(dispatcher, APP_ACTIONS.incrementClick.name);
                            }}
                        >
                            Click me
                        </button>
                        <h4>You have clicked {appStore?.clicksCount}</h4>
                        <button
                            onClick={_ => {
                                storeUpdateDispatch(dispatcher, APP_ACTIONS.decrementClick.name);
                            }}
                        >
                            Click me
                        </button>
                    </p>

                    <br/>

                </div>

            </div>

        </SafeComponentWrapper>
    );

}
