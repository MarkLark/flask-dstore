
// ****************************
// Flask-DataStore.dsview.template
// ****************************

DS.View.Template = DS.Object.extend({
    init: function( template, defaults ) {
        this.tmp_str = template;
        this.defaults = defaults;
        this.re_str;
        this.re_key;
        this.re;
    },

    init_view: function() {
        this.re_str = "";
        this.re_key = "";
        for ( var key in this.defaults ) {
            this.re_str += "{=" + key + "}|";
        }

        this.re_str = this.re_str.slice( 0, -1 );
        this.re = new RegExp( this.re_str, "g" );
    },

    render: function( data ) {
        var re_data = {};
        for ( var key in data ) {
            re_data[ "{=" + key + "}" ] = data[ key ];
        }

        return this.tmp_str.replace( this.re, function( m ) {
            return re_data[ m ];
        });
    }
});
