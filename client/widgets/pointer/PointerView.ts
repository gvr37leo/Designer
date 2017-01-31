declare var jade:any;
declare var templates:any;
class PointerView extends Backbone.View<Backbone.Model>{
    attribute:any;
    data:any;

    constructor(data, attribute){
        super();
        this.attribute = attribute
        this.data = data
        this.render();

        
    }

    render(){
        var that = this;
        var html = jade.compile(templates.boolean)({data:this.data, attributename:this.attribute})
        this.el.innerHTML = html
        return this;
    }

    events(){
        return {
            "click button":"save"
        }
    }

    save(){
        this.data[this.attribute] = !this.data[this.attribute];
        this.render();
    }
};