
view = DS.View.Element.new({
    name: "view-add-car",
    dom: {
        parent: { id: "add-car" },
        manufacturer: { id: "input[name='manufacturer']" },
        make: { id: "input[name='make']" },
        year: { id: "input[name='year']" },
        error: { id: "p" },
        submit: {
            id: "button",
            on_click: "submit"
        },
        form: {
            id: "form"//,
            //on_submit: "submit"
        }
    },
    events: {
        submit: DS.Event.new( name + "_on_submit" ),
        error: DS.Event.new( name + "_on_error" )
    },

    init_view: function() {
        DS.View.Element.init_view.call( this );
    },

    on_error: function() {
        this.dom.error.innerHTML = "Something happened";
        this.dom.error.style.display = "block";
        this.events.error.raise( this );
    },

    on_success: function() {
        this.dom.error.innerHTML = "";
        this.dom.error.style.display = "none";

    },

    submit: function( e ) {
        console.log( "Form submit: " + this.name );
    }
})
