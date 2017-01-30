#!/usr/bin/python

if __name__ == '__main__':
    from tests.app import create_app
    from tests.models import Car
    app, api = create_app( config = "tests.configs.server" )

    with app.app_context():
        api.store.create_all()

        Car( manufacturer = "Holden", make = "Commodore", year = 2005 ).add()
        Car( manufacturer = "Holden", make = "Commodore", year = 2006 ).add()
        Car( manufacturer = "Holden", make = "Commodore", year = 2007 ).add()
        Car( manufacturer = "Holden", make = "Commodore", year = 2008 ).add()
        Car( manufacturer = "Holden", make = "Commodore", year = 2009 ).add()

    app.run( host = "0.0.0.0", port = 5000, debug = True, use_reloader = False )

    with app.app_context():
        api.store.destroy_all()
