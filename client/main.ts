var router = new Router();

class Router extends Backbone.Router{
     constructor(){
         super()

         this.routes = {
            "":this.default,
            ":object":this.list,
            ":object/new":this.create,
            ":object/:id":this.detail,

         }
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

Backbone.history.start();