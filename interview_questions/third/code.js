function serilizeUrl(url) {
    var result = {};
    var urlGET = url.split("?")[1];
    var argArray = urlGET.split("&");
    for ( var i=0; i<argArray.length; i++ ) {
        result[argArray[i].split("=")[0]] = argArray[i].split("=")[1];
    }
    return result;
}

var result = serilizeUrl('http://iem.taobao.com/item.html?a=1&b=2&c=&d=xxx&e');
console.log(result);
