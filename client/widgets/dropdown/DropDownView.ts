declare var jade:any;
declare var templates:any;

interface JQuery {
    typeahead(options?):JQuery;
}

class DropDownView extends Backbone.View<Backbone.Model>{
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
        var html = jade.compile(templates.dropdown)({data:this.data, attributename:this.attribute})
        this.el.innerHTML = html
        this.$('#dropdown').typeahead({
            source:['aap','banaan'],
            minLength:0,
            showHintOnFocus:"all",
            afterSelect:function(selected){
                that.data[that.attribute.name] = selected._id;
            }
        });
        return this;
    }

    events(){
        return {
            
        }
    }

    save(){
        
    }
};