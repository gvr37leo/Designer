var definition

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
     }

     list(){
     }

     create(){
     }

     detail(){
     }
}

var router = new Router();

$.get('/definition.json',function(data){
    definition = data;
    Backbone.history.start();
})