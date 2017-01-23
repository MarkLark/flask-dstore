
DS.TestRunner.add( DS.Test.new({
    name: "crud.load",

    test: function() {
        ds.cars.make.events.load_all.success.listen( this.load_success, this, true );
        ds.cars.make.events.load_all.fail.listen( this.load_fail, this, true );

        ds.cars.make.load_all();
    },

    load_success: function() {
        var data     = ds.cars.make.data();
        var num_cars = data.length;

        if ( num_cars !== 5 ) {
            this.events.fail.raise( this, "Number of cars should be 5 not " + num_cars );
            this.events.finish.raise( this );
            return;
        }

        var year = 2005;
        for ( var i = 0; i < num_cars; i++ ) {
            var car = data[i];
            if ( car.year != year ) {
                this.events.fail.raise( this, "Car year should be " + year + " not " + car.year );
                this.events.finish.raise( this );
                return
            }
            year += 1;
        }

        this.events.success.raise( this );
        this.events.finish.raise( this );
    },

    load_fail: function() {
        this.events.fail.raise( this, "Failed to load data" );
        this.events.finish.raise( this );
    }
}));
