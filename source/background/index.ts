import { browser } from 'webextension-polyfill-ts';

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed');
});

async function init(): Promise<void> {
  console.log('background page loaded');
}

init();
