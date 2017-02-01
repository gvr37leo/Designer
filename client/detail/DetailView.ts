/// <reference path="../main.ts" />
class DetailView extends Backbone.View<Backbone.Model>{
    data;

    constructor(){
        super();
        this.render();
    }

    render() {
        var that = this;

        this.$el.html(jade.compile(templates.detail)({key:currentObjectName}));


        $.get("/api/" +  currentObjectName + '/' + currentId, (data) => {
            this.data = data;

            for(var i = 0; i < currentObjectDefinition.attributes.length; i++){
                var attribute:Attribute = currentObjectDefinition.attributes[i]
                var attributeView
                if(!attribute.array){
                    attributeView = widgetMap[attribute.type](data, attribute);
                }else{
                    attributeView = new ArrayView(data, attribute);
                }
                that.$('#attributeContainer').append(attributeView.el);
            }
        })



        return this;
    }

    events(){
        return{
            "click #btnSuccess":"save"
        }
    }

    save(){
        delete this.data._id
        superagent.put("/api/" + currentObjectName + '/' + currentId)
        .send(this.data)
        .then((res) => {
            router.navigate(currentObjectName, {trigger: true});
        })
    }
};

var widgetMap = {
    'boolean':(data, attribute) => {
        return new BooleanView(data, attribute)
    },
    'date':(data, attribute) => {
        return new DateView(data, attribute)
    },
    // 'dropdown':(data, attribute) => {
    //     return new DropDownView(data, attribute)
    // },
    'number':(data, attribute) => {
        return new NumberView(data, attribute)
    },
    'object':(data, attribute) => {
        return new DropDownView(data, attribute)
    },
    'pointer':(data, attribute) => {
        return new PointerView(data, attribute)
    },
    'text':(data, attribute) => {
        return new TextView(data, attribute)
    },
}