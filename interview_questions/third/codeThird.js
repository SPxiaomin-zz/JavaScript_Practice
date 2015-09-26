function getParas(url) {
    // 使用DOM 和 BOM的方法获得GET参数，第一次使用
    var anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    var search = anchor.search.slice(1);

    return search.split("&").reduce(function (result, params) {
        var r = params.split("=").map(function (o) {
            return decodeURIComponent(o);
        });
        result[r[0]] = r[1];
        return res;
    }, {});
}

var result;
result = getParas('http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e');

console.log(result);
