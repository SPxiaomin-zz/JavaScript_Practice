var o={   
    x: 10,   
    foo: function () {       
        with (this) {            
            function bar() {                 
                console.log(x);                 
                console.log(this.x);            
            }             
            var x=20;          
            (function() {                      
                bar();                 
            })();         
            bar.call(this);       
        }   
    } 
};
o.foo();
