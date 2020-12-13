//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import FallBackPage from './fall-back-page';

export default class SafeComponentWrapper extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error: error};
  }

  componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    // @ts-ignore
    console.log('caught error --- ', this.state.error);
    // @ts-ignore
    console.log('has error --- ', this.state.hasError);
    console.log('info --- ', info);
    console.log('error --- ', error);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return <FallBackPage/>;
    }
    return this.props.children;
  }
}
