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
        var html = jade.compile(templates.dropdown)({data:this.data, attributename:this.attribute.name})
        this.el.innerHTML = html
        superagent.get('/api/' + this.attribute.objectType)
        .then((res) => {
            this.$('#dropdown').typeahead({
                source:res.body,
                minLength:0,
                showHintOnFocus:"all",
                afterSelect:function(selected){
                    that.data[that.attribute.name] = selected._id;
                }
            });
            if(that.data[that.attribute.name]){
                $.get('/api/' + that.attribute.objectType + '/' + that.data[that.attribute.name], function(data){
                    that.$('#dropdown').val(data.name);
                })
            }
        })
        
        return this;
    }

    events(){
        return {
            
        }
    }

    save(){
        
    }
};