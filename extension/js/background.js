import { manageRequests } from './requests.js';
import { handleCookies } from './cookies.js';
import { observeDataLayer } from './dataLayer.js';


console.info('background.js loaded');


console.info('observing requests');
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    let request = manageRequests(details);
    console.log(request)
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);


console.info('observing cookies');
chrome.cookies.getAll({
  name: '_ga',
}, cookies => {
  handleCookies(cookies)
});