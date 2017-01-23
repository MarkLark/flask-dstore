
// ****************************
// Flask-DataStore.client.model
// ****************************
DS.Model = DS.Object.extend({
    init: function( args ) {
        this.factory = args[ "factory" ];
        this._index  = args[ "index"   ];

        this._assign_accessors();
        this.set( args );
    },

    _assign_accessors: function() {
        var num_vars = this.factory.vars.length;
        for ( var i = 0; i < num_vars; i++ ) {
            var variable = this.factory.vars[i];
            Object.defineProperty(
                this,
                variable.name,
                {
                    get: this.create_getter( variable.name ),
                    set: this.create_setter( variable.name )
                }
            );
        }
    },

    _data: function() {
        return this.factory.data()[ this._index ];
    },

    json: function() {
        return DS.copy_opts( {}, this._data() );
    },

    json_str: function() {
        return JSON.stringify( this._data() );
    },

    set: function( args ) {
        if ( typeof args === "undefined" ) args = {};
        var num_vars = this.factory.vars.length;
        for ( var i = 0; i < num_vars; i++ ) {
            var variable = this.factory.vars[i];
            this[ variable.name ] = args[ variable.name ] || this[ variable.name ] || variable.default;
        }
    },

    create_getter: function( name ) {
        var self = this;
        return function() {
            return self._data()[ name ];
        };
    },

    create_setter: function( name ) {
        var self = this;
        return function( x ) {
            self._data()[ name ] = x;
        };
    },

    create_ro_setter: function( name ) {
        var self = this;
        return function( x ) {
            console.log( "Cannot set variable '" + name + "' of a ReadOnly Model '" + self.factory.namespace + "'" );
        };
    },

    save: function() {
        if ( this.id == null )
            this.factory.server.add( this );
        else
            this.factory.server.update( this );
    },

    delete: function() {
        this.factory.server.delete( this );
    }
});
