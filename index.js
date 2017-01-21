
class Register {
    constructor() {
        this.routes = [];
    }
    regist(obj, k ,fn) {
        const route = this.routes.find((el) => {
            let result;
            if ((el.key === k || el.key.toString() === k.toString()) && Object.is(el.obj, obj)) {
                result = el;
            }
        })
        if (route) {
            route.fn.push(fn);
        } else {
            this.routes.push({
                obj,
                key: k,
                fn: [fn]
            })
        }
    }
    build() {
        this.routes.forEach((route) => {
            observer(route.obj, route.key, route.fn);
        });
    }
}
// {function A() {
//     console.log('A');
// }
// A.prototype = {
//     aa: function() {
//         console.log('A.prototype');
//     }
// }
// function Bridge() {
// }
// Bridge.prototype = A.prototype;
// function B() {}
// B.prototype = new Bridge()
// console.log(B.prototype)}

// 被订阅者
function Click() {
    this.handles = [];
}
Click.prototype = {
    subscribe: function(fn) {
        this.handles.push(fn);
    },
    unsubscribe: function(fn) {
        this.handles = this.handles.filter(
            function(item) {
                if (item != fn) {
                    return item;
                }
        });
    },
    fire: function(scope, params) {
        var _scope = scope || window;
        this.handles.forEach(function(fn) {
            fn.call(_scope, params);
        });
    }
}
var click = new Click();
var test = {
    name: 'john',
    log: function(params) {
        console.log(params, this.name);
    }
}
click.subscribe(test.log);
click.fire(test, ['this is ', 'wonder']);
