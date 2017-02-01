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
        var html = jade.compile(templates.number)({data:this.data, attributename:this.attribute.name})
        this.el.innerHTML = html
        var mySlider = this.$("input").slider({
            min:0,
            max:20
        });
        
        mySlider.slider('setValue', this.data[this.attribute.name])
        mySlider.on('change', (a)=>{
            this.data[this.attribute.name] = mySlider.slider('getValue')
        })

        return this;
    }

    events(){
        return {
           
        }
    }
};