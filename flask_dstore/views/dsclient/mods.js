
// ****************************
// Flask-DataStore.client.mods
// ****************************
DS.Mod = DS.Object.extend({
    init: function( type ) { this.type = type; },
    validate: function( val ) { return true; }
});

DS.Mods = {};

DS.Mods.Min = DS.Mod.extend({
    init: function( min ) {
        DS.Mod.init.call( this, "Min" );
        this.min = min;
    },
    validate: function( val ) {
        if ( val < this.min )
            return false;
        return true;
    }
});

DS.Mods.Max = DS.Mod.extend({
    init: function( max ) {
        DS.Mod.init.call( this, "Max" );
        this.max = max;
    },
    validate: function( val ) {
        if ( val > this.max )
            return false;
        return true;
    }
});

DS.Mods.NotNull = DS.Mod.extend({
    init: function() {
        DS.Mod.init.call( this, "NotNull" );
    },
    validate: function( val ) {
        if ( val == null )
            return false;
        return true;
    }
});

DS.Mods.AutoIncrement = DS.Mod.extend({
    init: function() {
        DS.Mod.init.call( this, "AutoIncrement" );
    }
});

DS.Mods.PrimaryKey = DS.Mod.extend({
    init: function() {
        DS.Mod.init.call( this, "PrimaryKey" );
    }
});

DS.Mods.Unique = DS.Mod.extend({
    init: function() {
        DS.Mod.init.call( this, "Unique" );
    }
});
