
// ****************************
// Flask-DataStore.client.vars
// ****************************
DS.Var = DS.Object.extend({
    init: function( args ) {//type, name ) {
        this.type    = args[ "type"    ];
        this.name    = args[ "name"    ];
        this.mods    = args[ "mods"    ] || [];
        this.default = args[ "default" ] || null;
    },
    validate: function() {
        var num_mods = this.mods.length;
        for ( var i = 0; i < num_mods; i++ ) {
            if ( this.mods[i].validate( this.value ) == false )
                return false;
        }
        return true;
    }
});

DS.Vars = {};

DS.Vars.Number = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Number";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.Boolean = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Boolean";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.Character = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Character";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.Binary = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Binary";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.String = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "String";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.Text = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Text";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.Float = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Float";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.Enum = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Enum";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.ForeignKey = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "ForeignKey";
        DS.Var.init.call( this, args );
    }
});

DS.Vars.Date = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Date";
        DS.Var.init.call( this, arg );
    }
});

DS.Vars.Time = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "Time";
        DS.Var.init.call( this, arg );
    }
});

DS.Vars.DateTime = DS.Var.extend({
    init: function( args ) {
        args[ "type" ] = args[ "type" ] || "DateTime";
        DS.Var.init.call( this, arg );
    }
});

DS.Vars.RowID = DS.Vars.Number.extend({
    init: function() {
        var args = {};
        args[ "name" ] = "id";
        args[ "type" ] = args[ "type" ] || "RowID";
        args[ "mods" ] = args[ "mods" ] || [];

        args[ "mods" ].push( DS.Mods.NotNull.new() );
        args[ "mods" ].push( DS.Mods.NotNull.new() );

        DS.Vars.Number.init.call( this, args );
    }
});
