function getParas(url) {
    // 使用DOM 和 BOM的方法获得GET参数，第一次使用
    var anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    var search = anchor.search.slice(1);

    var result = {};
    var reg = /(\w+)(?:=([^&]*))?/g; //切记别忘了 g 参数，设置全局模式
    var match = reg.exec(search);
    while ( match ) {
        result[match[1]] = match[2];
        match = reg.exec(search);
    }

    return result;
}

var result;
result = getParas('http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e');

console.log(result);
