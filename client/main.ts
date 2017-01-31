/// <reference path="../node_modules/@types/superagent/index.d.ts" />
/// <reference path="../node_modules/@types/backbone/index.d.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/@types/superagent/index.d.ts" />
/// <reference path="./widgets/boolean/BooleanView.ts" />
/// <reference path="./widgets/date/DateView.ts" />
/// <reference path="./widgets/dropdown/DropDownView.ts" />
/// <reference path="./widgets/number/NumberView.ts" />
/// <reference path="./widgets/object/ObjectView.ts" />
/// <reference path="./widgets/pointer/PointerView.ts" />
/// <reference path="./widgets/text/TextView.ts" />
declare var superagent;

declare var templates:any;
templates = {};

var definition;
var app = document.querySelector('#app')

class Router extends Backbone.Router{
    routes = {
        "":this.default,
        ":object":this.list,
        ":object/new":this.create,
        ":object/:id":this.detail,

    };

     constructor(){
         super();
        (<any>this)._bindRoutes();
     }

     default(){

         superagent.get('/api/company/57a3418be3427a10b0dd611a').then((res) => {
            var dateView = new DropDownView({},{})
            app.appendChild(dateView.el);
         })
         
     }

     list(){
     }

     create(){
     }

     detail(){
     }
}

var router = new Router();
var names = ['boolean', 'date', 'detail', 'dropdown', 'list', 'number', 'object', 'pointer', 'text', 'wrapper']
var calls = [];
for(var _name of names){
    (function(_name){
        calls.push(superagent.get('templates/' + _name + '.jade').then((data) => {
            templates[_name] = data.text;
        }))
    })(_name)
}
Promise.all(calls).then((values) => {
    $.get('/definition.json',function(data){
        definition = data;
        Backbone.history.start();
    })
})

