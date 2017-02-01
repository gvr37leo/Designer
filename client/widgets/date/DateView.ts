declare var jade;

class DateView extends Backbone.View<Backbone.Model>{
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

        var html = jade.compile(templates.date)({data:this.data, attributename:this.attribute.name});
        this.el.innerHTML = html
        
        var elem = this.$('#dateField')
        elem.val(this.data[this.attribute.name])
        var datetimepicker = elem.datetimepicker({
            format:"DD-MM-YYYY HH:mm"
        });

        elem.on("dp.change", function(e){
            that.data[that.attribute.name] = e.date.format("DD-MM-YYYY HH:mm");
        });
        return this;
    }
};
