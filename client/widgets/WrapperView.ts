/// <reference path="../main.ts" />
class WrapperView extends Backbone.View<Backbone.Model>{
    view;
    template;
    templateContext;


    constructor(object?, template?, templateContext?){
        super();
        this.view = object.view;
        this.template = template;
        this.templateContext = templateContext
        this.render();
    }

    render() {
        var that = this;

        // this.$el.html();
        this.setElement(jade.compile(this.template)(this.templateContext))
        this.$('#viewContainer').html(this.view.el);

        return this;
    }
};
