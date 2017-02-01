/// <reference path="../main.ts" />
class DetailNewView extends Backbone.View<Backbone.Model>{
    data;

    constructor(){
        super();
        this.data = createEmptyObject(currentObjectDefinition);
        this.render();
    }

    render() {
        var that = this;

        this.$el.html(jade.compile(templates.detail)({key:currentObjectName}));

        for(var i = 0; i < currentObjectDefinition.attributes.length; i++){
            var attribute:Attribute = currentObjectDefinition.attributes[i]
            var attributeView
            if(!attribute.array){
                attributeView = widgetMap[attribute.type](this.data, attribute);
            }else{
                attributeView = new ArrayView(this.data, attribute);
            }
            that.$('#attributeContainer').append(attributeView.el);
        }
        return this;
    }

    events(){
        return{
            "click #btnSuccess":"save"
        }
    }

    save(){
        superagent.post("/api/" + currentObjectName)
        .send(this.data)
        .then((res) => {
            router.navigate(currentObjectName, {trigger: true});
        })
    }
};

function createEmptyObject(objectDescription){
    var object = {};
    for(var i = 0; i < objectDescription.attributes.length; i++){
        var attribute = objectDescription.attributes[i];
        if(attribute.array)object[attribute.name] = [];
        else {
            switch(attribute.type){
                case 'text':
                    object[attribute.name] = "";
                    break;
                case 'date':
                    object[attribute.name] = "";
                    break;
                case 'object':
                    object[attribute.name] = "";
                    break;
                case 'number':
                    object[attribute.name] = 0;
                    break;
                case 'boolean':
                    object[attribute.name] = false;
                    break;
                default:
                    object[attribute.name] = "";
            }
        }
    }
    return object;
}