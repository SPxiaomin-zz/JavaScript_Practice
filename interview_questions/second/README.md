# 第二题（2015/9/20）

## 题目

以下代码执行后输出的值分别是？

    var o={   
        x: 10,   
        foo: function () {       
            with (this) {            
                function bar() {                 
                    alert(x);                 
                    alert(this.x);            
                }             
                var x=20;          
                (function() {                      
                    bar();                 
                })();         
                bar.call(this);       
           }   
       } 
    } 
    o.foo();

题目测试结果：undefined, undefined, undefined, 20.

## 思路讲解

这道题目真的考察的知识点是挺坑的:

- 变量声明的提升 和 函数声明的提升（function declaration hoisting）

    使用 `var` 声明的变量会自动被添加到最近的环境中。在函数内部，最接近的环境就是函数的局部环境；在 `with` 语句中，最接近的环境是函数环境。如果初始化变量时没有使用 `var` 声明，该变量会自动被添加到全局环境 。函数声明的提升和变量声明的提升类似。
    
    题目代码等价如下：
    
        var o={   
            x: 10,   
            foo: function () {  
                
                //改动如下
                var x;
                function bar() { 
                    alert(x);                 
                    alert(this.x);            
                }  
                
                with (this) {                        
                    x=20;       
                    (function() {                      
                        bar();                 
                    })();         
                    bar.call(this);       
               }   
            } 
        } 
        o.foo();

- `with` 语句延长作用域链

    这个语句会在作用域链的前端添加一个变量对象。
    
    因此在上面的代码中的 `with` 代码块都受到了 `with(this)` 语句中的 `this` 对象的影响，产生如下等效的代码：
    
        var o={   
            x: 10,   
            foo: function () {  
                var x;
                function bar() {                 
                    alert(x);                 
                    alert(this.x);            
                }  
                
                with (this) {                        
                    o.x=20;       //改动代码
                    (function() {                      
                        bar();                 
                    })();         
                    bar.call(this);       
               }   
            } 
        } 
        o.foo();

- `call()` 方法的使用

    这个方法的用途是在特定的作用域中调用函数，实际上等于设置函数体内 `this` 对象的值。接受参数的时候参数 **必须逐个** 列举出来。还有一个作用和它一样的方法 `apply()` ，两者的区别是传递参数的区别，`apply()` 参数可以是一个 `Array` 的实例，也可以是 `arguments` 对象。
    
    上面的代码中使用了 `bar.call(this)`, `this` 对象指向的是对象 `o`， 所以最后一个输出的结果是 `20`。
    
- 闭包中的 `this` 对象

    上面的代码中 `bar` 函数的定义其实就是闭包。
    
    每个函数在被调用的时都会自动取得两个特殊变量： `this` 和 `arguments`，内部函数在搜索这两个变量的时候，只会搜索到其活动对象为止，因此这里 `this` 对象取得的就是全局对象。
    
- 访问全局变量的x属性与在作用域链中搜索x的区别

    这是一个十分坑的问题，我真的是第一次遇到，后面在 [cnode 社区](https://cnodejs.org/topic/55fe7bf148055cd15e2c8711#55fe7cec48055cd15e2c8712) 提问以及看红皮书，对这个问题有了一定的见解：
    
    标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。
    
    这段代码中之所以在运行 `alert(x)` 这行代码的时候未发生错误的原因是在 `with(this)` 代码块中由于 `var x=20;` 这行代码，不经意间由于变量的提升，对x进行了声明，所以第1，3个结果是 `undefined`。
    
    但是在如下的情况下就会发生错误：
    
    1. `return this.name`  
    
            var object = {
                getName: function () {
                    return function () {
                        return this.t;
                    };
                }
            };
            console.log(object.getName()());      //undefined 
    
    2. `return name`
    
            var object = {
                getName: function () {
                    return function () {
                        return t;
                    };
                }
            };
            
            console.log(object.getName()());      //ReferenceError: t is not defined
    
    错误的原因是：
    
    第1段代码返回的是全局对象的一个未赋值的属性，所以返回 `undefined` ,同理可得原题目中的答案是 `undefined`。
    
    第2段代码试图去返回一个未定义的变量，因为未声明，解释器去内存中根本找不到 `t` 这个东西。
    
    `js` 允许在声明变量的时候不使用 `var` (实质上没有声明变量，只不过是对全局变量的赋值，但是这并不代表你可以使用一个未经声明的变量。
    
