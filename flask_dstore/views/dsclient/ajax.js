
// ****************************
// Flask-DataStore.client.ajax
// ****************************
DS.Ajax = DS.Object.extend({
    init: function( args ) {
        this.url          = args[ "url" ];
        this.method       = args[ "method" ] || "GET";
        this.content_type = args[ "content_type" ] || "json";

        this.success = DS.Event.new( "Ajax.Success[" + this.url + "]" );
        this.fail    = DS.Event.new( "Ajax.Fail["    + this.url + "]" );

        if ( "success" in args ) this.add_listener( this.success, args[ "success"] );
        if ( "fail"    in args ) this.add_listener( this.fail,    args[ "fail"   ] );
    },
    add_listener: function( method, args ) {
        if ( typeof args === "function" ) method.listen( args );
        else if ( Array.isArray( args ) ) method.listen( args[0], args[1] );
    },
    send: function( data ) {
        var xhr  = new XMLHttpRequest();

        xhr.open( this.method, this.url );
        xhr.setRequestHeader( "Content-Type", "application/" + this.content_type );
        xhr.setRequestHeader( "X-Requested-With", "XMLHttpRequest" );

        var self = this;
        xhr.onload = function() {
            var data = xhr.responseText;
            if ( xhr.getResponseHeader( "Content-Type" ) === "application/json" ) data = JSON.parse( data );

            if ( xhr.status === 200 ) self.success.raise( data );
            else self.fail.raise( xhr.status, data );
        };

        xhr.send( data );
    }
});
