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

        that.render();
        
    }

    render() {
        var that = this;

        this.$el.html(jade.compile(templates.list)());
        

        for(var i = 0; i < currentObjectDefinition.attributes.length; i++){//header and search
            var attribute:Attribute = currentObjectDefinition.attributes[i];

            var headerCell = $(jade.compile('th\n   a.clickable #{name}')({name:attribute.name}));
            this.$('#headerAttributeContainer').append(headerCell)
            

            var searchCell = $(jade.compile('th\n   input.form-control')({}));
            searchCell.find('input').on('input', (e)=>{
                console.log('change')
            })
            this.$('#headerSearchContainer').append(searchCell)
        }
        that.$('#headerAttributeContainer').append(jade.compile(templates.addButton)({key:currentObjectName}))
        this.renderList();
        
        return this;
    }

    renderList(){
        $.get("api/" + currentObjectName,(data) =>{
            this.data = data;
            this.filteredData = data;

            that.$('#listElementContainer').html('')
            for(var object of this.data){//rows
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
        })
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
