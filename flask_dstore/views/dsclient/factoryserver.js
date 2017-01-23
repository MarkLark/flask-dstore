
DS.FactoryServer = DS.Object.extend({
    init: function( args ) {
        this.factory  = args[ "factory" ];
        this.base_url = DS.Manager.base_url + "/" + this.factory.namespace.replace( ".", "/" ) + "/";
        this._create_ajax();
    },

    _create_ajax: function() {
        this.ajax = {
            load_all: DS.Ajax.new({
                url: this.base_url,
                method: "GET",
                content_type: "json",
                success: [ this.load_all_success, this ],
                fail: [ this.load_all_fail, this ],
            }),
            load: DS.Ajax.new({
                url: this.base_url,
                method: "GET",
                content_type: "json",
                success: [ this.load_success, this ],
                fail: [ this.load_fail, this ],
                model: null
            }),
            add: DS.Ajax.new({
                url: this.base_url,
                method: "POST",
                content_type: "json",
                fail: [ this.add_fail, this ],
                success: [ this.add_success, this ],
                model: null
            }),
            update: DS.Ajax.new({
                url: this.base_url,
                method: "PATCH",
                content_type: "json",
                fail: [ this.update_fail, this ],
                success: [ this.update_success, this ],
                model: null
            }),
            delete: DS.Ajax.new({
                url: this.base_url,
                method: "DELETE",
                content_type: "json",
                fail: [ this.delete_fail, this ],
                success: [ this.delete_success, this ],
                model: null
            })
        }
    },

    add: function( model ) {
        this.ajax.add.model = model;
        this.ajax.add.send( model.json_str() );
    },

    add_success: function( event, data ) {
        this.ajax.add.model.set( data );
        this.factory.events.add.success.raise( data );
        this.factory.events.add.always.raise( data );
        this.ajax.add.model = null;
    },

    add_fail: function( event, code, data ) {
        console.warn( "Add failed. Code: " + data.code + ", Msg: " + data.message );
        this.factory.events.add.fail.raise( code, data );
        this.factory.events.add.always.raise( data );
        this.ajax.add.model = null;
    },

    load_all: function() {
        this.ajax.load_all.send();
    },

    load: function( id ) {
        this.ajax.load.url += id;
        this.ajax.load.send();
        this.ajax.load.url = this.base_url;
    },

    load_success: function( event, data ) {
        this.factory._update_row( data );
        this.factory.events.load.success.raise( this.factory );
        this.factory.events.load.always.raise( this.factory );
    },

    load_fail: function( event, code, data ) {
        console.warn( "Loading failed. Code:" + data.code + ", Msg: " + data.message );
        this.factory.events.load.fail.raise( this.factory );
        this.factory.events.load.always.raise( this.factory );
    },

    load_all_success: function( event, data ) {
        this.factory._set_data( data );
        this.factory.events.load_all.success.raise( this.factory );
        this.factory.events.load_all.always.raise( this.factory );
    },

    load_all_fail: function( event, code, data ) {
        console.warn( "Loading all failed. Code: " + data.code + ", Msg: " + data.message );
        this.factory.events.load_fail.success.raise( this.factory );
        this.factory.events.load_fail.always.raise( this.factory );
    },

    update: function( model ) {
        this.ajax.update.url += model.id;
        this.ajax.update.send( model.json_str() );
        this.ajax.update.url = this.base_url;
    },

    update_fail: function( event, code, data ) {
        console.warn( "Update failed. Code: " + data.code + ", Msg: " + data.message );
        this.factory.events.update.fail.raise( code, data );
        this.factory.events.update.always.raise( code, data );
    },

    update_success: function( event, data ) {
        this.factory._update_row( data );
        this.factory.events.update.success.raise( data );
        this.factory.events.update.always.raise( data );
    },

    delete: function( model ) {
        this.ajax.delete.url += model.id;
        this.ajax.delete.model = model;
        this.ajax.delete.send();
        this.ajax.delete.url = this.base_url;
    },

    delete_fail: function( event, code, data ) {
        console.warn( "Delete failed. Code: " + data.code + ", Msg: " + data.message );
        this.factory.events.delete.fail.raise( code, data );
        this.factory.events.delete.always.raise( code, data );
    },

    delete_success: function( event, data ) {
        this.factory._delete_row( this.ajax.delete.model );
        this.ajax.delete.model = null;
        this.factory.events.delete.success.raise( data );
        this.factory.events.delete.always.raise( data );
    }
});
