export function manageRequests(details) {
  if (details) {
    let decoder = new TextDecoder();
    const { url, method, requestBody, timeStamp: timestamp, initiator } = details;
    let parsedBody = (requestBody?.raw || [])[0]?.bytes
    parsedBody = new Int8Array(parsedBody);
    parsedBody = decoder.decode(parsedBody);
    let body = {
      url, method,
      requestBody: !url.includes('clarity') ? parsedBody : '',
      timestamp, initiator
    };
    let hostname = initiator ? initiator.replace(/^https?:\/\//, '') : '';
    const excludeUrlFilter = new RegExp([hostname, 'githubusercontent', 'shields.io', 'googleapis', 'cdnjs'].join('|'));
    const excludeInitiatorFilter = new RegExp(['google.com', 'youtube', 'facebook', 'twitter'].join('|'))
    if (!excludeUrlFilter.test(url) && !excludeInitiatorFilter.test(initiator))
      // console.log(body);
      return body;



    // console.log(body)

    //return {cancel: true};
  }
}
