/// <reference path="../main.ts" />
class DetailNewView extends Backbone.View<Backbone.Model>{
    data;

    constructor(){
        super();
        this.render();
    }

    render() {
        var that = this;

        this.$el.html(jade.compile(templates.detail)({}));


        $.get("/api/" +  currentObjectName + '/' + currentId, (data) => {
            this.data = data;

            for(var i = 0; i < currentObjectDefinition.attributes.length; i++){
                var attribute:Attribute = currentObjectDefinition.attributes[i]

                if(!attribute.array){
                    var attributeView = widgetMap[attribute.type](data, attribute);
                    that.$('#attributeContainer').append(attributeView.el);
                }else{

                }
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
        superagent.put("/api/" + currentObjectDefinition.key + '/' + currentId)
        .send(this.data)
        .then((res) => {
            router.navigate(currentObjectDefinition.key, {trigger: true});
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