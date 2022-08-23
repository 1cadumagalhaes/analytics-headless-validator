0
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Waiting for message');

  console.log(request.message)
  return sendResponse()

});

// if (request.message == 'tab_loaded') {
//   let script;
//   script = document.queryElementById('dataLayerScript');
//   if (!script) {
//     script = document.createElement('script');
//     script.id('dataLayerScript');
//     script.innerHTML = observeDataLayer().toString();
//     document.head.appendChild(script);
//   }

//   const button = document.createElement('a');
//   button.innerHTML = `
//   <a href="#" class="float">
//     Roi
//   </a>
//   `;
//   button.style.cssText = `
//   .float{
//     position:fixed;
//     width:60px;
//     height:60px;
//     bottom:40px;
//     right:40px;
//     background-color:#0C9;
//     color:#FFF;
//     border-radius:50px;
//     text-align:center;
//     box-shadow: 2px 2px 3px #999;
//   }
//   `;
//   document.body.appendChild(button)
//   return sendResponse({ message: 'injected' });
// }