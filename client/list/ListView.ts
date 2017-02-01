/// <reference path="../main.ts" />
class ListView extends Backbone.View<Backbone.Model>{
    data;
    filteredData;
    filter;
    sortAscending;
    sortAttribute;

    constructor(){
        super();
        var that = this;
        this.data;
        this.filteredData;
        this.filter = {};
        this.sortAscending = true;
        this.sortAttribute = null;


        $.get("api/" + currentObjectName,(data) =>{
            this.data = data;
            this.filteredData = data;
            that.render();
        });
        
        
    }

    render() {
        var that = this;

        this.$el.html(jade.compile(templates.list)());
        

        for(var i = 0; i < currentObjectDefinition.attributes.length; i++){//header and search
            var attribute:Attribute = currentObjectDefinition.attributes[i];

            var headerCell = $(jade.compile('th\n   a.clickable #{name}')({name:attribute.name}));
            this.$('#headerAttributeContainer').append(headerCell);
            ((attributeName) => {
                headerCell.find('a').click((e) => {
                    this.sortAscending = !this.sortAscending;
                    this.filteredData.sort((a, b) => {
                        if(a[attributeName] < b[attributeName])return negateIfInverted(-1);
                        if(a[attributeName] == b[attributeName])return 0;
                        if(a[attributeName] > b[attributeName])return negateIfInverted(1);
                    })
                    function negateIfInverted(a){
                        if(!that.sortAscending)return a * -1;
                        return a;
                    }
                    this.renderList();
                })
            })(attribute.name)
            
            

            var searchCell = $(jade.compile('th\n   input.form-control')({}));
            ((attributeName) => {
                searchCell.find('input').on('input', (e:any)=>{
                    this.filter[attributeName] = e.currentTarget.value;
                    this.applyFilter();
                    this.renderList();
                })
            })(attribute.name)
            this.$('#headerSearchContainer').append(searchCell)
        }
        that.$('#headerAttributeContainer').append(jade.compile(templates.addButton)({key:currentObjectName}))

        for(var i = 0; i < currentObjectDefinition.functions.length; i++){
            var current = currentObjectDefinition.functions[i]
            var func = Function("view", current.code);
            var headerCell = $(jade.compile('th\n   button.btn.btn-default|#{name}')({name:current.name}));
            headerCell.find('button').click((e) => {func(this)});
            this.$('#headerFunctionsContainer').append(headerCell)
        }

        this.renderList();
        
        return this;
    }

    renderList(){
        this.$('#listElementContainer').html('')
        for(var object of this.filteredData){//rows
            var row = $(jade.compile('tr')({}));
            this.$('#listElementContainer').append(row)
            for(var i = 0; i < currentObjectDefinition.attributes.length; i++){//cells
                var attribute:Attribute = currentObjectDefinition.attributes[i];
                
                var cell = $(jade.compile('td\n  input.form-control(value="#{data}")')({data:object[attribute.name]}));
                row.append(cell)

            }
            row.append($(jade.compile(templates.detailButton)(_.extend({key:currentObjectName}, object))))
            var deleteButton = $(jade.compile(templates.deleteButton)({}))
            deleteButton.click((e) => {
                superagent.delete('/api/' + currentObjectName + '/' + object._id)
                .then()
            })
            row.append(deleteButton)
        }
        var that = this;
        

        return this;
    }

    applyFilter(){
        var that = this;
        this.filteredData = this.data.filter((entry) => {
            var equal = true;
            //pass if all attributes of entry are a like the one in filter
            for (var key in that.filter){
                if(!new RegExp('.*' + that.filter[key] + '.*').test(entry[key]))equal = false;
            }
            return equal;
        })
    }
};
