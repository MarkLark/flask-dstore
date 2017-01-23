
DS.TestRunner.add( DS.Test.new({
    name: "crud.not_null",

    test: function() {
        ds.cars.make.events.add.success.listen( this.add_success, this );
        ds.cars.make.events.add.fail.listen( this.add_fail, this );

        var car = ds.cars.make.add();
        car.manufacturer = "Ford";
        car.make = "Falcon";

        car.save();
    },

    add_success: function( event, data ) {
        console.log( "ADD SUCCESS" );
        this.events.fail.raise( this, "NotNull was never raised" );
        this.events.finish.raise( this );
    },

    add_fail: function( event, code, data ) {
        console.log( "ADD FAIL" );
        this.events.success.raise( this );
        this.events.finish.raise( this );
    }
}));
