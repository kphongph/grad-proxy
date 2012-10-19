
function matcher (url, dest) {
  var r = new RegExp(url.replace(/\//, '\\/'));
  return function (url) {
    var m = r.exec(url);
    if (!m) {
      return;
    }
    var path = url.slice(m[0].length);
    console.log('proxy:', url, '->', dest);
    return {url: path, dest: dest};
  }
}

module.exports = function(urls) {
  var matchers = [];
  for (var url in urls) {
    matchers.push(matcher(url, urls[url]));
  }

  return function (req, res, next) {
    var proxy = next;
    for (var k in matchers) {
      var m = matchers[k](req.url);
      if (m) {
        req.url = m.url;
        req.headers.host = m.host;
        return proxy.proxyRequest(req, res, m.dest);
      }
    }
    next(); 
  }
}
