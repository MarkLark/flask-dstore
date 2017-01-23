
DS.TestRunner = DS.Object.new({
    tests: [],
    num_tests: 0,
    tests_ran: 0,
    num_success: 0,
    num_fail: 0,
    current_test: 0,
    dom: {
        output: DS.DOM.ID( "test-output" ),
        results: DS.DOM.ID( "test-results" )
    },
    add: function( test ) {
        this.tests.push( test );
        this.num_tests += 1;
    },

    init_tests: function() {
        var prev_test = null;

        for ( var i = 0; i < this.num_tests; i++ ) {
            var test = this.tests[i];

            test.events.fail.listen( this.on_fail, this, true );
            test.events.success.listen( this.on_success, this, true );
            test.events.finish.listen( this.on_finish, this );

            if ( prev_test == null ) {
                prev_test = test;
                continue;
            }

            //prev_test.events.finish.listen( test.test, test, true );
        }

        this.current_test = -1;
        this.tests_ran = 0;
    },

    run: function() {
        this.init_tests();
        this.run_next_test();
    },

    on_fail: function( event, test, msg ) {
        console.error( test.name + ":FAIL! " + msg );

        var html = "<tr><td>" + test.name + "</td>";
        html    += "<td style='color: red'>FAIL</td>";
        html    += "<td>" + msg + "</td>";

        this.dom.output.innerHTML += html;
        this.num_fail += 1;
    },

    on_success: function( event, test ) {
        console.warn( test.name + " SUCCESS" );

        var html = "<tr><td>" + test.name + "</td>";
        html    += "<td style='color: green'>SUCCESS</td>";
        html    += "<td></td>";

        this.dom.output.innerHTML += html;
        this.num_success += 1;
    },

    run_next_test: function() {
        this.current_test += 1;
        var test = this.tests[ this.current_test ];

        console.warn( "Running Test: " + test.name );

        test.test();
    },

    on_finish: function( event, test ) {
    this.tests[ this.current_test ].ran = true;
        this.tests_ran += 1;

        if ( this.tests_ran === this.num_tests ) {
            var html = "<strong>Number of tests: </strong>" + this.tests_ran + "<br/>";
            html    += "<strong>Number of success: </strong>" + this.num_success + "<br/>";
            html    += "<strong>Number of failed: </strong>" + this.num_fail + "<br/>";
            this.dom.results.innerHTML += html;
        } else {
            this.run_next_test();
        }
    }
});
