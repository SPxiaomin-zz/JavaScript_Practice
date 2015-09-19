var Scope = function(){};

Scope.prototype.$clone = function () {
    var f = function(){}; //创建一个新的构造函数

    f.prototype = this; //将原型指向当前的Scope实例

    return new f(); //返回新创建的这个对象的实例
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
