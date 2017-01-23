
DS.View.List = DS.View.Element.extend({
    init_view: function() {
        this.init_events();
        DS.View.Element.init_view.call( this );
        this.template.init_view();
    },

    init_events: function() {
        this.model.events.load_all.success.listen( this.on_load_all, this );
        this.model.events.add.success.listen( this.on_add, this );
        this.model.events.update.success.listen( this.on_update, this );
        this.model.events.delete.success.listen( this.on_delete, this );
    },

    on_load_all: function( event, factory ) {
        this.reload_view();
    },

    on_add: function( event, instance ) {
        this.reload_view();
    },

    on_update: function( event, instance ) {
        this.reload_view();
    },

    on_delete: function( event, instance ) {
        this.reload_view();
    },

    reload_view: function() {
        var html = "";
        var data = this.model.data();

        var num_data = data.length;
        for ( var i = 0; i < num_data; i++ ) {
            html += this.template.render( data[i] );
        }

        this.dom.data.innerHTML = html;
    }

});
