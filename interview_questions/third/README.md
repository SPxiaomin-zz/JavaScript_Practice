# 第三题（2015/9/26）

## 题目

有这样一个URL：<http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e>，请写一段JS程序提取URL中的各个GET参数(参数名和参数个数不确定)，将其按key-value形式返回到一个json结构中，如{a:’1′, b:’2′, c:”, d:’xxx’, e:undefined}。

## 思路讲解1

当我第一眼看到这个题目的时候，我就傻眼了，这么简单。看了一下别人写的答案，和我的思路是一样的：

1. 可以将这个URL看成是一个字符串，然后对字符串进行操作。
2. 又各个 `GET` 参数都在 `?` 的后面，于是便可以通过 `split` 方法进行拆分。
3. 同2，各个参数都是通过 `&` 分隔开来的，于是又用 `split` 方法来进行拆分。
4. 然后通过 `Object` 类型的方括号语法来创建对象的属性名、值对。之所以选择方括号语法的原因是，通过`split`方法分隔后得到的依然是字符串类型，并且只能通过方括号语法来通过变量访问属性。

### 知识点讲解 

- `split()` 方法

    这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。分隔符可以是字符串，也可以是 `RegExp` 对象（这个方法不会将字符串看成正则表达式）。`split()` 方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小。
    
    看个例子吧：
    
        var colorText = "red,blud,green,yellow";
        var colors1 = colorText.split(",");       //["red", "blue", "green", "yellow"]
        var colors2 = colorText.split(",", 2);    //["red", "blue"]

### 实现代码

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

## 思路讲解2

参考了一下别人的实现方法，虽然感觉复杂了一点，但是能学到的知识点相当的多，喜欢学习的我果断的把相关的知识点通过 Google 和红皮书，全部解决了，O(∩_∩)O哈哈哈~

简单的说就是可以分为两步：

1. 通过DOM和BOM方法获取相应的GET参数
2. 通过设置了全局模式的正则表达式的捕获组捕获相关的内容。

### 知识点讲解

- DOM 方法创建节点并设置 `href` 属性

        var anchor = document.createElement("a");
        anchor.setAttribute("href", url);

- setAttribute

    这个方法使用来对属性节点的值做出修改:
    
        object.setAttribute(attribute, value);

- BOM 方法获得 GET 参数并通过 `javascript` 的 `slice` 方法对取掉开头的 `?` 号

        var search = anchor.search.slice(1);
    
- `slice` 方法讲解
    
    这是一个基于子字符串创建新字符串的方法。接受一或两个参数，第一个参数指定子字符串的开始位置，第二个参数指定的是子字符串最后一个字符后面的位置。

        var stringValue = "hello world";
        console.log(stringValue.slice(3));         //"lo world"
        console.log(stringValue.slice(3, 7));      //"lo w"

    在传入的参数为负值的情况下，这个方法会将传入的负值与字符串的长度相加。
    
        var stringValue = "hello world";
        console.log(stringValue.slice(-3));        //"rld"
        console.log(stringValue.slice(3, -4));     //"lo w"
    
    其实和这个方向作用相同的方法还有 `substring` 和 `substr`，但是这两个方法在传入的参数为负值的情况下，有些劣势，所以还是个人认为在一般的情况下还是使用 `slice` 方法比较好。
    
- 正则表达式简单讲解（只讲解使用到了的部分）

    1. 元字符 `\w`
    
        这个元字符匹配字母或数字或下划线或汉字。
        
    2. 重复 
    
        - `?` 
        
            说明 ： 重复零次或一次
            
        - `*` 
        
            说明 ： 重复零次或更多次。    
            
    3. 字符类
    
        `[^&]` ： 这个方括号代表的是匹配这中间的任意一个字符都可以，但是在这里就不是这样了，由于加了 `^` 这个反义字符之后，代表的是除了 `&` 这个字符之外的任意字符。
    
    4. 捕获组
    
        简单的说就是相对应的内容能够通过相应编号的变量来取得，具体的实现方式因语言的不同而不同。
    
        `()`： 在一般的情况之下，这个括号中内容，根据从左到右的顺序依次从小到大进行编号。
        
        这里还使用到了一个比较特殊的捕获语法 `(?:exp)` ，意思是匹配 `exp`，但是不捕获匹配的文本，也不给此分组分配组号。
        
    如果你是第一次接触正则表达式的话，一般人看不懂很正常，我上面都提供了相应的关键字，自已一个个去 Google 吧。
    
- `javascript` 中的 `RegExp` 类型的 `exec()` 方法

    这个方法是专门为捕获组而设计的。接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回 null（这就是为什么我可以在代码中使用 `while` 循环的原因）。在数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串（如果模式中没有捕获组，则该字符串只包含一项）。
    
    记得在写正则表达式的时候，一定要加全局标志（g），这样才可以在每次调用 `exec` 方法的时候会在字符串中继续查找新匹配项。
    
### 实现代码

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

    由于在这个代码中使用了 `DOM` 和 `BOM` 所以代码只能在浏览器的控制台中运行。运行结果如下：
    
    Object {a: "1", b: "2", c: "", d: "xxx", e: undefined}

其实上面代码中的函数还有另外的一种实现方式：

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

- `javascript` 中数组的 `reduce` 方法

    这个方法我是见过多次了，但是直到见到了这种用法之后，才知道自己认识的只是 `reduce` 方法的一小块，后面看了一下 [mdn 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)，弄懂了。
    
    这是个归并数组的方法，这个方法会迭代数组中的所有项，然后构建一个最终返回的值。`reduce` 方法从数组的第一项开始，逐个遍历到最后。
    
    这个方法接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。传进去的函数接受4个参数：前一个值、当前值、当前项的索引和数组对象。这个函数任何的返回值都会作为第一个参数自动传给下一项。如果没有传递归并基础的初始值的话，第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。
    
    看看下面的两个代码吧，如果还看不懂我也没办法了：）
    
    第一段代码是没有传递初始值的：
    
        var values = [1, 2, 3, 4, 5];
        var sum = values.reduce(function (prev, cur, index, array) {
            return prev + cur;
        });
        console.log(sum);    //15
        
    第二段代码是传递了初始值的：
    
    
        var values = [1, 2, 3, 4, 5];
        var sum = values.reduce(function (prev, cur, index, array) {
            return prev + cur;
        }, 10);
        console.log(sum);    //25
        
    与这个方法的功能类似的还有另外的一种实现方法 `reduceRight`，唯一的区别是这个方法从数组的最后一项开始，向前遍历到第一项。
    
- `javascript` 中数组的 `map` 方法

    这个方法对数组中的每一项运行给定的函数，返回每次函数调用的结果组成的数组。
    
    还是举个例子吧，这样才能比较好的理解概念：
    
        var numbers = [1, 2, 3, 4, 5];
        var mapResult = numbers.map(function (item, index, array) {
            return item * 2;
        });
        
        console.log(mapResult);    //[2, 4, 6, 8, 10]
    
- Global 对象的 URI 编码方法

    Global 对象的 `encodeURI()` 和 `encodeURIComponent()` 方法可以对 URI 进行编码。使用前者编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了 `%20`。而后者则会使用对应的编码替换所有非字母数字字符。
    
    相应的解码方式是 `decodeURI()` 和 `encodeURIComponent`。
