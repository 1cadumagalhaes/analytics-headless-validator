import axios from 'axios';

export async function getAllPages(url) {

  let links = await getSiteMap(url);

  if (!links) throw new Error('No sitemap found');
  let pages = []
  for await (let link of links) {
    if (link.includes('xml') && link.includes('sitemap')) {
      let page = await getSiteMap(link);
      pages.push(page);
    }
    else
      pages.push(link);
  }
  return pages.flat();
}

async function getSiteMap(url = 'www.dp6.com.br') {
  try {
    url = /sitemap|xml/.test(url) ? url : `https://${url}/sitemap.xml`;
    console.info(`Getting ${url}`);
    let sitemap = await axios.get(url);

    let data = await sitemap.data;
    let links = data.match(/<loc>(.*?)<\/loc>/g).map(r => r.replace(/<\/?loc>/g, ''));
    return links;
  } catch (error) {
    console.error(error);
  }

}
