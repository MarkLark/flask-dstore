// ****************************
// Flask-DataStore.client.utils
// ****************************
DS.utils = DS.utils || {};
DS.utils.forEachIn = function( object, action ) {
    for ( var property in object ) {
        if ( object.hasOwnProperty( property ) )
            action( property, object[ property ] );
    }
}

DS.utils.clone = function( object ) {
    function obj() {}
    obj.prototype = object;
    return new obj();
}

DS.Object = {
    init: function( opts ) {
        DS.copy_opts( this, opts );
    }
};

DS.Object.prototype = Object.prototype;

DS.Object.prototype.new = function() {
    var object = DS.utils.clone( this );
    if ( typeof object.init == "function" ) object.init.apply( object, arguments );
    return object;
}

DS.Object.prototype.extend = function( properties ) {
    var result = DS.utils.clone( this );
    DS.utils.forEachIn( properties, function( name, value ) { result[ name ] = value; });
    return result;
}

DS.utils.form_to_json = function( from ) {
    data = form.serializeArray();
    rtn = {};
    for ( var i = 0; i < data.length; ++i ) {
        var obj = data[i];
        rtn[ obj[ "name" ] ] = obj[ "value" ];
    }
    return rtn;
}

DS.copy_opts = function( obj, options ) {
    for ( var key in options )
        obj[ key ] = options[ key ];
    return obj;
}
