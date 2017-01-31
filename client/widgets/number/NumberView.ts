declare var jade:any;
declare var templates:any;
class NumberView extends Backbone.View<Backbone.Model>{
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
        var html = jade.compile(templates.number)({data:this.data, attributename:this.attribute})
        this.el.innerHTML = html
        var mySlider = this.$("#inputField").slider({
            min:0,
            max:20,
        });

        return this;
    }

    events(){
        return {
           
        }
    }

    save(){
        this.data[this.attribute] = !this.data[this.attribute];
        this.render();
    }
};