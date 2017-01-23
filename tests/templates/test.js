
DS.Test = DS.Object.extend({
    init: function( opts ) {
        DS.copy_opts( this, opts );
        this.name = this.name || "Test";
        this.events = this.events || {};
        this.events.success = DS.Event.new( this.name + ".success" );
        this.events.fail    = DS.Event.new( this.name + ".fail"    );
        this.events.finish  = DS.Event.new( this.name + ".finish"  );
        this.ran            = false;

        this.init_test();
    },

    init_test: function() {},

    test: function() {}
})
