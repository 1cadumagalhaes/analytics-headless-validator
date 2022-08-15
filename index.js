import { validateUrls } from './src/bowser.js';
import { getAllPages } from './src/pages.js';



const default_filter = ['google-analytics', 'facebook', 'ga-audiences', 'firebase', 'doubleclick', 'analytics.google', 'googletagmanager', 'cloudfunctions', 'clarity.ms']

let urls = ['https://dp6.com.br'];
let hostname = 'dp6.com.br'



export async function validateDomain({ hostname = hostname, urls = [], filter = default_filter, launchHeadless = true, writeToFile = true, blockRequests = false, dataLayerName = 'dataLayer' }) {
  if (!urls.length && hostname) urls = await getAllPages(hostname);
  //excluindo página do site dp6 que não está funcionando corretamente
  urls = urls.filter(page => !page.includes('contato'));


  console.table(urls);

  if (urls)
    await validateUrls(hostname, urls, filter, { writeToFile, blockRequests, launchHeadless, dataLayerName });
}

validateDomain({ hostname, urls });