import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import StatefulApp from '../stateful';

function initApp() {
  console.log('initApp - iframe');
  const mountNode = document.createElement('div');
  mountNode.id = 'iframeApp';
  document.body.prepend(mountNode);

  console.log('initApp - iframe: going to initialise store');
  const store = new Store();
  console.log('initApp - iframe: store initialisation started ');
  store.ready().then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <StatefulApp appName="iframe" />
      </Provider>,
      mountNode
    );
  });
}

initApp();
