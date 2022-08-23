export function observeDataLayer(dl_name = 'dataLayer') {

  function sendMessage(item) {
    try {
      window.postMessage({
        message: 'dispatch_data_layer',
        data: item,
        url: window.location.href
      }, "*");
    } catch (error) {
      console.error(error);
    }
  }

  const dl_ref = window[dl_name];
  if (!dl_ref.push_c) {

    dl_ref.forEach(sendMessage);

    dl_ref.push_c = dl_ref.push;

    dl_ref.push = function (...args) {
      dl_ref.push_c(...args);
      sendMessage(args[0]);
    }
  }
}

