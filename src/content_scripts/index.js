import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';

import StatefulApp from './stateful';

const browser = require('webextension-polyfill');

const initIFrameApp = () => {
  console.log('content_scripts.initIFrameApp');
  const iframeID = 'demo-iframe';
  const mountNode = document.createElement('div');
  mountNode.id = `${iframeID}-container`;
  document.body.prepend(mountNode);

  const iframeSrc = browser.extension.getURL('iframe.html');

  ReactDOM.render(
    <iframe
      id={iframeID}
      sandbox="allow-scripts"
      scrolling="no"
      name={iframeID}
      src={iframeSrc}
      title={iframeID}
    />,
    mountNode
  );
};

const initStatefulApp = () => {
  console.log('content_scripts.initStatefulApp');
  const mountNode = document.createElement('div');
  mountNode.id = 'statefulApp-container';
  document.body.prepend(mountNode);

  const store = new Store();
  // wait for the store to connect to the background page
  store.ready().then(() => {
    // The store implements the same interface as Redux's store
    // so you can use tools like `react-redux` no problem!
    ReactDOM.render(
      <Provider store={store}>
        <StatefulApp appName="non-iframe" />
      </Provider>,
      mountNode
    );
  });
};

initStatefulApp();

initIFrameApp();
