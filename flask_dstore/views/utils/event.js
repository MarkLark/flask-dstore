
// ****************************
// Flask-DataStore.client.event
// ****************************
DS.Event = DS.Object.extend({
    init: function( name ) {
        this.name = name;
        this.listeners = [];
        this._running = false;

        var self = this;
        this.Listener = DS.Object.extend({
            init: function( func, context, once ) {
                if ( typeof context === "undefined" || context == null ) context = window;
                if ( typeof once    === "undefined" ) once = false;

                this.func    = func;
                this.context = context;
                this.once    = once;
                this.event = self;

                this.add();
            },

            fire: function( args ) {
                if ( this.once ) this.remove();
                return this.func.apply( this.context, args );
            },

            add: function() {
                this.event.listeners.push( this );
            },

            remove: function() {
                this.event.remove( this.func, this.context );
            }
        });
    },

    raise: function() {
        this._running = true;
        console.log( "Firing event: " + this.name );

        var args = [ this ].concat( Array.from( arguments ) );
        for ( var i = 0; i < this.listeners.length; i++ ) {
            if ( ! this._running ) {
                console.log( "Cancelling event: " + this.name );
                return false;
            }
            this.listeners[i].fire( args );
        }
        return true;
    },

    listen: function( func, context, once ) {
        return this.Listener.new( func, context, once );
    },

    remove: function( func, context ) {
        var i = this.get_index( func, context );
        this.listeners.splice( i, 1 );
    },

    get: function( func, context ) {
        var i = this.get_index( func, context );
        return this.listeners[i];
    },

    get_index: function( func, context ) {
        if ( typeof context === "undefined" ) context = window;
        for ( var i = 0; i < this.listeners.length; i++ ) {
            var l = this.listeners[i];
            if ( l.func !== func ) continue;
            else if ( l.context !== context ) continue;
            return i;
        }
        return -1;
    },

    cancel: function() {
        this._running = false;
    }
});
