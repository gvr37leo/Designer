/// <reference path="../main.ts" />
class ArrayView extends Backbone.View<Backbone.Model>{
    data;
    attribute;

    constructor(data, attribute){
        super();
        this.attribute = attribute
        this.data = data
        this.render();
    }

    render() {
        var that = this;
        this.$el.html(jade.compile('div.well#arrayEntryContainer')());

        var ViewType = widgetMap[this.attribute.type];

        var arrayContainer = this.$('#arrayEntryContainer')

        for(var i = 0; i < this.data[this.attribute.name].length; i++){

            (function(i){//used for unique index in delete event for splice
                var view = ViewType(that.data[that.attribute.name], {"name":i,objectType:that.attribute.objectType})
                var wrapperView = new WrapperView({view:view},templates.detailArrayWrapper)
                wrapperView.$('#deleteBtn').click(() => {
                    that.data[that.attribute.name].splice(i, 1)
                    that.render();
                })
                arrayContainer.append(wrapperView.el)
            })(i)
        }

        var newItem = {'value':null}
        var view = ViewType(newItem, {name:'value',objectType:that.attribute.objectType});
        var wrapperView = new WrapperView({view:view},templates.detailArrayAdder);
        arrayContainer.append(wrapperView.el)
        wrapperView.$('#addBtn').click(() => {
            that.data[that.attribute.name].push(newItem.value)
            that.render();
        })
        return this;
    }

};
