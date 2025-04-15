/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { FC, ReactNode, useState } from 'react';
import FallBackPage from './fall-back-page';

export interface SafeComponentWrapperProps {
  children: ReactNode;
}
const SafeComponentWrapper: FC<SafeComponentWrapperProps> = ({ children }) => {
  const [state] = useState<{ hasError: boolean; error: Error | null }>({
    hasError: false,
    error: null,
  });

  // const getDerivedStateFromError = (error: Error) => {
  //   setState({ hasError: true, error });
  // };

  // const componentDidCatch = (error: Error, info: any) => {
  //   console.log('caught error --- ', state.error);
  //   console.log('has error --- ', state.hasError);
  //   console.log('info --- ', info);
  //   console.log('error --- ', error);
  // };

  if (state.hasError) {
    return <FallBackPage />;
  }

  return <>{children}</>;
};

export default SafeComponentWrapper;
