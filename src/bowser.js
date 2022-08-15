import puppeteer from "puppeteer-extra";
import { existsSync, mkdirSync, writeFileSync } from 'fs';
// import { PuppeteerExtraPluginAdblocker } from "puppeteer-extra-plugin-adblocker";
export async function validateUrls(page, urls = [], filter, { writeToFile = false, blockRequests = false, dataLayerName = 'dataLayer', launchHeadless = true, debug = true }) {
  try {
    // const {StealthPLugin} = stealth;
    // puppeteer.use(StealthPLugin());
    // puppeteer.use(PuppeteerExtraPluginAdblocker({ useCache: false }));

    const browser = await puppeteer.launch({
      headless: launchHeadless,
    });

    const options = { writeToFile, filter, blockRequests, dataLayerName };

    const page_folder = `results/${page}`;
    if (writeToFile) {
      !existsSync(page_folder) && mkdirSync(page_folder);
    }

    for await (let url of urls) {
      let path = url.replace(/https?:\/\//, '').replace(page, '').replace(/^\/|\/$/g, '').replaceAll('/', '_');

      let filepath = page_folder + (path === '' ? '/home/' : `/${path}/`).replace(/\/$/, '.json');

      if (debug) console.log({ filepath });
      let results = await interceptRequests(browser, url, options);
      console.log(results);
      if (writeToFile)
        writeFileSync(
          filepath,
          JSON.stringify(results, null, 2)
        );
    }
    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

export async function interceptRequests(browser, url, { dataLayerName = 'dataLayer', blockRequests = false, filter = [''], getRequests = true, getScripts = true, getDataLayer = true }) {

  try {
    let requests = [], scripts = [], dataLayer = [];

    const timestamp = new Date().toISOString();

    console.table({ url, dataLayerName, blockRequests, getRequests, getScripts, getDataLayer });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.setRequestInterception(true);

    console.info('Getting requests...');
    const filterRegex = new RegExp(filter.join('|'));
    page.on('request', request => {
      const request_url = request.url();
      if (filterRegex.test(request_url)) {
        const method = request.method();
        const postData = !request_url.includes('clarity') ? request.postData() : null;
        requests.push({
          request_url, method, postData, time: new Date().toISOString()
        });
      }
      if (blockRequests) request.abort();
      else request.continue();
    });


    await page.goto(url).catch(error => console.error('errooooooo', error));

    if (getScripts) {
      console.info('Getting scripts...');
      scripts = await page.evaluate(() => [...document.querySelectorAll('script')]
        .map(row => row.src)
        .filter(row => !row.includes(location.hostname) && row.length > 0));
    }

    if (getDataLayer) {
      console.info('Getting dataLayer...');
      dataLayer = await page.evaluate(`window["${dataLayerName}"]`);
    }


    await page.close();

    const results = { url, timestamp, requests, scripts, dataLayer };
    return results;
  } catch (error) {
    console.log('interceptRequest', error);
  }

}
