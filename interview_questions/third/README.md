# 第三题（2015/9/26）

## 题目

有这样一个URL：http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e，请写一段JS程序提取URL中的各个GET参数(参数名和参数个数不确定)，将其按key-value形式返回到一个json结构中，如{a:’1′, b:’2′, c:”, d:’xxx’, e:undefined}。

## 思路讲解

当我第一眼看到这个题目的时候，我就傻眼了，这么简单。看了一下别人写的答案，和我的思路是一样的：

1. 可以将这个URL看成是一个字符串，然后对字符串进行操作。
2. 又各个 `GET` 参数都在 `?` 的后面，于是便可以通过 `split` 方法进行拆分。
3. 同2，各个参数都是通过 `&` 分隔开来的，于是又用 `split` 方法来进行拆分。
4. 然后通过 `Object` 类型的方括号语法来创建对象的属性名、值对。之所以选择方括号语法的原因是，通过`split`方法分隔后得到的依然是字符串类型，并且只能通过方括号语法来通过变量访问属性。

- `split()` 方法

    这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。分隔符可以是字符串，也可以是 `RegExp` 对象（这个方法不会将字符串看成正则表达式）。`split()` 方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小。
    
    看个例子吧：
    
        var colorText = "red,blud,green,yellow";
        var colors1 = colorText.split(",");       //["red", "blue", "green", "yellow"]
        var colors2 = colorText.split(",", 2);    //["red", "blue"]

## 实现代码

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
    
    运行及结果输出：
    
    ┌[2015-09-26/8.14  11:03:21]
    ├[1+4][~/Learn/JavaScript_Practice/interview_questions/third]
    └[gujunmin@www-20 ╰_╯]$ node code.js 
    { a: '1', b: '2', c: '', d: 'xxx', e: undefined }

