//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax
import React from 'react';
import FallBackPage from './fall-back-page';

export default class SafeComponentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error: error};
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('caught error --- ', this.state.error);
    console.log('has error --- ', this.state.hasError);
    console.log('info --- ', info);
    console.log('error --- ', error);
  }

  render() {
    if (this.state.hasError) {
      return <FallBackPage />;
    }
    return this.props.children;
  }
}
