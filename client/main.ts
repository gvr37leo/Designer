/// <reference path="../node_modules/@types/superagent/index.d.ts" />
/// <reference path="../node_modules/@types/backbone/index.d.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/@types/superagent/index.d.ts" />
/// <reference path="tsdef.ts" />
/// <reference path="./widgets/boolean/BooleanView.ts" />
/// <reference path="./widgets/date/DateView.ts" />
/// <reference path="./widgets/dropdown/DropDownView.ts" />
/// <reference path="./widgets/number/NumberView.ts" />
/// <reference path="./widgets/object/ObjectView.ts" />
/// <reference path="./widgets/pointer/PointerView.ts" />
/// <reference path="./widgets/text/TextView.ts" />
/// <reference path="detail/DetailView.ts" />
/// <reference path="detail/DetailNewView.ts" />
/// <reference path="detail/ArrayView.ts" />
/// <reference path="list/ListView.ts" />
/// <reference path="widgets/WrapperView.ts" />

declare var superagent;
declare var templates:any;
templates = {};

var currentObjectName
var currentObjectDefinition
var currentId

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
        currentObjectName = Object.keys(definition)[0];
        currentObjectDefinition = definition[Object.keys(definition)[0]];
        var listView = new ListView();
        app.innerHTML = '';
        app.appendChild(listView.el)
        
    }

    list(object){
        currentObjectName = object;
        currentObjectDefinition = definition[object];
        var listView = new ListView();
        app.innerHTML = '';
        app.appendChild(listView.el)
    }

    create(object){
        currentObjectName = object;
        currentObjectDefinition = definition[object];
        var detailNewView = new DetailNewView();
        app.innerHTML = '';
        app.appendChild(detailNewView.el);
    }

    detail(object, id){
        currentObjectName = object;
        currentObjectDefinition = definition[object];
        currentId = id;
        var detailView = new DetailView();
        app.innerHTML = '';
        app.appendChild(detailView.el);
    }
}

var router = new Router();
var names = ['detailArrayAdder','detailArrayWrapper','boolean', 'date', 'detail', 'dropdown', 'list', 'number', 'object', 'pointer', 'text', 'wrapper','addButton','detailButton','deleteButton']
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
        for(var key in definition){
            $('#navItemContainer').append(jade.compile("a(href='/##{key}').navbar-text #{key}")({key:key}))
        }
        Backbone.history.start();
    })
})

