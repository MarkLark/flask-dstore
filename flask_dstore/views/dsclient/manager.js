
DS.Manager = DS.Object.new({
    facts: [],
    _loaded: {},
    _data: {},
    base_url: "{{ url_prefix }}",
    add: function( factory ) {
        this.facts.push( factory );
    },
    events: {
        load_all: DS.Event.new( "DS.Manager.load_all.success" )
    },
    load_all: function() {
        var num_facts = this.facts.length;
        for ( var i = 0; i < num_facts; i++ ) {
            this.facts[i].events.load_all.success.listen( this._load_success, this );
            this.facts[i].load_all();
        }
    },
    _load_success: function( event, factory ) {
        this._loaded[ factory.namespace ] = true;

        var num_facts = this.facts.length;
        var all_loaded = true;
        for ( var i = 0; i < num_facts; i++ ) {
            if ( ! ( this.facts[i].namespace in this._loaded ) ) {
                all_loaded = false;
                break;
            }
        }

        if ( all_loaded ) {
            this.events.load_all.raise();
        }
    }
});
