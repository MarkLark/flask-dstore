
DS.TestRunner.add( DS.Test.new({
    name: "crud.update",

    test: function() {
        ds.cars.make.events.update.success.listen( this.update_success, this, true );
        ds.cars.make.events.update.fail.listen( this.update_fail, this, true );

        car = ds.cars.make.get( 1 );
        car.year = 2010;
        car.save();
    },

    update_success: function() {
        this.events.success.raise( this );
        this.events.finish.raise( this );
    },

    update_fail: function() {
        this.events.fail.raise( this, "Failed to update the instance" );
        this.events.finish.raise( this );
    }
}));
