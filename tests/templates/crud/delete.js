
DS.TestRunner.add( DS.Test.new({
    name: "crud.delete",

    test: function() {
        ds.cars.make.events.delete.success.listen( this.delete_success, this, true );
        ds.cars.make.events.delete.success.listen( this.delete_fail, this, true );
        var car = ds.cars.make.get( 1 );
        car.delete()
    },

    delete_success: function() {
        this.events.success.raise( this );
        this.events.finish.raise( this );
    },

    delete_fail: function() {
        this.events.fail.raise( this );
        this.events.finish.raise( this );
    }
}));
