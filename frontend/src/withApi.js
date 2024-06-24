import React from 'react';
import { useApi } from './ApiContext.js';

const withApi = (Component) => {
  return function WrappedComponent(props) {
    const apiContext = useApi();
    return <Component {...props} apiContext={apiContext} />;
  };
};

export default withApi;
