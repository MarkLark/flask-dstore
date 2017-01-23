
// ****************************
// Flask-DataStore.dsview.element
// ****************************

DS.View.Element = DS.Object.extend({
    init: function( opts ) {
        DS.copy_opts( this, opts );
        this.init_view();
    },

    init_view: function() {
        var self = this;
        var parent = DS.DOM.ID( this.dom.parent.id );

        for ( var key in this.dom ) {
            var id   = this.dom[ key ].id;
            var node = DS.DOM.CSS( id, parent );

            for ( var k in this.dom[ key ] ) {
                var k_sub = k.substr( 0, 3 );
                var k_val = this.dom[ key ][ k ];

                if ( k_sub === "on_" ) {
                    var k_event = k.substr( 3 );
                    var func = self[ k_val ];
                    node.addEventListener( k_event, function( e ) {
                        return func.call( self, e );
                    });
                }
            }

            if ( key === "parent" ) {
                this.dom.parent = parent;
            } else {
                this.dom[ key ] = node;
            }

        }
    },

    render: function() {},

    hide: function() {},

    show: function() {}
});
