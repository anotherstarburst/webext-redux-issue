# webext-redux issue-256

This is a simple webextension built solely for the purpose of posting an issue for the excellent https://github.com/tshaddix/webext-redux package.

Issue raised: https://github.com/tshaddix/webext-redux/issues/256


# What it does

- Injects 2 divs at the top of the page:

1. A react component that has access to the redux store and a button to increase the value of a counter
2. The same component as (1) but with it injected into an iframe

In Chrome, all parts of this work as expected. In Firefox an error is thrown.

# To run

`npm install`

`npm run-script build`

## Chrome

1. Go to chrome://extensions/
2. Turn on developer mode
3. Load unpacked and navigate to the `build` directory of this repo
4. Navigate to any page e.g. https://bbc.co.uk

## Firefox

1. Go to about:debugging#/runtime/this-firefox
2. Load temporary add on `build` directory of this repo and select `manifest.json`
3. Navigate to any page e.g. https://bbc.co.uk


