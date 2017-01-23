
// ****************************
// Flask-DataStore.client.factory
// ****************************
DS.Factory = DS.Object.extend({
    init: function( args ) {
        this.namespace = args[ "namespace" ];
        this.vars      = args[ "vars"      ];
        this._data     = DS.Manager._data;
        this._obj_name = null;
        DS.Manager.add( this );

        this._link_data();
        this.server = DS.FactoryServer.new( { factory: this } );

        var self = this;
        this.Model = DS.Model.extend({
            init: function( args ) {
                args[ "factory" ] = self;
                DS.Model.init.call( this, args );
            }
        });

        this.events = {
            add: {
                success: DS.Event.new( this.namespace + ".add.success" ),
                fail: DS.Event.new( this.namespace + ".add.fail" ),
                always: DS.Event.new( this.namespace + ".add.always" )
            },
            update: {
                success: DS.Event.new( this.namespace + ".update.success" ),
                fail: DS.Event.new( this.namespace + ".update.fail" ),
                always: DS.Event.new( this.namespace + ".update.always" )
            },
            delete: {
                success: DS.Event.new( this.namespace + ".delete.success" ),
                fail: DS.Event.new( this.namespace + ".delete.fail" ),
                always: DS.Event.new( this.namespace + ".delete.always" )
            },
            load: {
                success: DS.Event.new( this.namespace + ".load.success" ),
                fail: DS.Event.new( this.namespace + ".load.fail" ),
                always: DS.Event.new( this.namespace + ".load.always" )
            },
            load_all: {
                success: DS.Event.new( this.namespace + ".load_all.success" ),
                fail: DS.Event.new( this.namespace + ".load_all.fail" ),
                always: DS.Event.new( this.namespace + ".load_all.always" )
            }
        }
    },

    _link_data: function() {
        var factory   = ds;

        var ns = this.namespace.split( "." );
        var num_ns = ns.length;

        for ( var i = 0; i < num_ns; i++ ) {
            this._obj_name = ns[i];

            if ( !( this._obj_name in this._data ) ) {
                if ( i == ( num_ns - 1 ) ) {
                    factory[ this._obj_name ] = this;
                    this._data[ this._obj_name ] = [];
                } else {
                    factory[ this._obj_name ] = {};
                    this._data[ this._obj_name ] = {};

                    this._data = this._data[ this._obj_name ];
                }
            } else {
                this._data = this._data[ this._obj_name ];
            }

            factory = factory[ this._obj_name ];
        }
    },

    data: function() {
        return this._data[ this._obj_name ];
    },

    _set_data: function( data ) {
        this._data[ this._obj_name ] = data;
    },

    _update_row: function( data ) {
        var row = this.get( data.id );
        if ( row === null ) row = this.add( data );
        else row.set( data );
    },

    _delete_row: function( data ) {
        this.data().splice( data._index, 1 );
    },

    _fix_indices: function() {
        var d = this.data();
        var num_data = d.length;
        for ( var i = 0; i < num_data; i++ )
            d[i]._index = i;
    },

    load_all: function() {
        this.server.load_all();
    },

    load: function( id ) {
        this.server.load( id );
    },

    get: function( id ) {
        var num_data = this.data().length;
        for ( var i = 0; i < num_data; i++ ) {
            var row = this.data()[i];
            if ( row.id === id ) return this.Model.new( { index: i } );
        }
        return null;
    },

    add: function( args ) {
        if ( typeof args === "undefined" ) args = {};
        args[ "index" ] = this.data().push( {} ) - 1;
        return this.Model.new( args );
    }
});
