DS.DOM = DS.DOM || {};

DS.DOM.ID = function( id, node ) {
    if ( typeof( node ) === "undefined" ) node = document;
    return node.getElementById( id );
}

DS.DOM.Tag = function( tag, node ) {
    if ( typeof( node ) === "undefined" ) node = document;
    return node.getElementsByTagName( tag );
}

DS.DOM.Class = function( cls, node ) {
    if ( typeof( node ) === "undefined" ) node = document;
    return node.getElementsByClassName( cls );
}

DS.DOM.CSS = function( css, node ) {
    if ( typeof( node ) === "undefined" ) node = document;
    return node.querySelector( css );
}

DS.DOM.CSSAll = function( css, node ) {
    if ( typeof( node ) === "undefined" ) node = document;
    return node.querySelectorAll( css );
}

DS.DOM.Form = function( id, node ) {
    if ( typeof( node ) === "undefined" ) node = document;
    return node.forms[ id ];
}

DS.DOM.Image = function( id, node ) {
    if ( typeof( node ) === "undefined" ) node = document;
    return node.images.namedItem( id );
}

DS.DOM.Script = function( id, node ) {
    if ( typeof( node ) === "undefined" ) node = document;
    return node.scripts.namedItem( id );
}
