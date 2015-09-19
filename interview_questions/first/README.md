# 第一题（2015/9/19） 

## 题目

网易web前端校招面试题的问题

    假设需实现构造函数Scope，它的特性如下：

    var scopeA = new Scope();
    scopeA.title = 'My title';
    var scopeB = scopeA.$clone();
    //实例有$clone方法用创建一个对象克隆，表现如下
    console.log(scopeB.title === 'My title' ); //输出true
    scopeA.title = 'Home title' ;
    console.log(scopeB.title === 'Home title' );//输出true
    //但是一旦scopeB主动修改它的属性，scopeA并不受影响
    scopeB.title = 'scopeB title' ;
    console.log(scopeA.title === 'Home title' )//输出true
    
    请实现满足这个条件构造函数Scope(只需实现上述描述要求即可)。
    
## 思路讲解

这道题目考察的就是 *道格拉斯.克罗克福德* 在2006年写得一篇文章- *Prortotypal Inheritance in JavaScript* 中提及到的原型式继承，他的想法是借助原型可以基于已有的对象创建新对象，同事还不必因此创建自定义类型。

实现代码：

    function object(o) {
        function F(){};
        F.prototype = o;
        return new F()
    }

代码详解：

在 `object()` 函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例。从本质上讲，`object()` 对传入其中的对象执行了一次浅复制。

简单的讲解的话，题目考察的就是就是原型继承和自定义属性覆盖原型属性。

## 实现参考代码

    var Scope = function(){};

    Scope.prototype.$clone = function () {
        function F(){}; //创建一个新的构造函数
    
        F.prototype = this; //将原型指向当前的Scope实例
    
        return new F(); //返回新创建的这个对象的实例
    };
    
    var scopeA = new Scope();
    scopeA.title = 'My title';
    
    var scopeB = scopeA.$clone(); //实例通过原型链继承了scopeA的属性
    
    console.log(scopeB.title === 'My title'); //输出true
    
    scopeA.title = 'Home title';
    console.log(scopeB.title === 'Home title'); //输出ture
    
    //由于通过原型链来继承，改变scopeB的属性后，scopeA的属性并不会改变
    scopeB.title = 'scopeB title';
    console.log(scopeA.title === 'Home title'); //输入ture
    console.log(scopeB.title); //输出scopeB title
    
其实在 `ECMAScript5` 中通过新增 `Objct.create()` 方法规范化了原型式继承。但是这个方法是有局限性的--（IE9+才支持），所以我就不展开介绍了，如需了解，自行Google吧:)
