var ITEMS, CUR_IMAGE_INDEX, IMAGE_COUNT;

var CallbackRegistry = {};
function scriptRequest(url, onSuccess, onError) {

  var scriptOk = false;
  var callbackName = 'cb' + String(Math.random()).slice(-6);


  url += ~url.indexOf('?') ? '&' : '?';
  url += 'callback=CallbackRegistry.' + callbackName;


  CallbackRegistry[callbackName] = function(data) {
    scriptOk = true;
    delete CallbackRegistry[callbackName];
    onSuccess(data);
  };

  function checkCallback() {
    if (scriptOk) return;
    delete CallbackRegistry[callbackName];
    onError(url);
  }

  var script = document.createElement('script');

  script.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      this.onreadystatechange = null;
      setTimeout(checkCallback, 0);
    }
  }


  script.onload = script.onerror = checkCallback;
  script.src = url;

  document.body.appendChild(script);
}

function ok(data) {
  ITEMS = data.response.items;
  IMAGE_COUNT = ITEMS.length;
  var container = document.getElementsByClassName("div-1")[0];
  for (var i = 0; i < ITEMS.length; i++) {

    var content = document.createElement("img");
    content.src = ITEMS[i].sizes[3].url;
    content.style.margin = "2";
    content.width = 320;
    content.height = 213;
    content.onclick = function () {
      showModalWindow(this);
    };
    content.className = "myImg";
    container.appendChild(content);
  }
}
function fail(url) {
  alert('Ошибка при запросе ' + url);
}



