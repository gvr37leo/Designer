class TextView extends Backbone.View<Backbone.Model>{
    attribute:any;
    data:any;

    constructor(data, attribute){
        super();
        this.attribute = attribute
        this.data = data
        this.render();
    }

    render() {
        var that = this;

        this.setElement(jade.compile(templates.text)({data:this.data, attributename:this.attribute.name}));

        return this;
    }

    events(){
        return{
            "input":"valueChange"
        }
    }

    valueChange(e){
        this.data[this.attribute.name] = $(e.target).val()
    }
};
