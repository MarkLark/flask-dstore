
DS.TestRunner.add( DS.Test.new({
    name: "crud.create",

    test: function() {
        ds.cars.make.events.add.success.listen( this.add_success, this );
        ds.cars.make.events.add.fail.listen( this.add_fail, this );

        var car = ds.cars.make.add();
        car.manufacturer = "Ford";
        car.make = "Falcon";
        car.year = 2010;

        car.save();
    },

    add_success: function( event, instance ) {
        if ( this.ran ) return;
        this.events.success.raise( this );
        this.events.finish.raise( this );
    },

    add_fail: function( event, code, instance ) {
        if ( this.ran ) return;
        this.events.fail.raise( this, "Failed to add instance" );
        this.events.finish.raise( this );
    }
}));
