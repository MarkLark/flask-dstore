from . import BaseTest
from .models import Car


class TestModelClient( BaseTest ):
    def test_model_url( self ):
        with self.app.app_context():
            self.api.store.create_all()

            Car( manufacturer = "Holden", make = "Commodore", year = 2005 ).add()
            Car( manufacturer = "Holden", make = "Commodore", year = 2006 ).add()
            Car( manufacturer = "Holden", make = "Commodore", year = 2007 ).add()
            Car( manufacturer = "Holden", make = "Commodore", year = 2008 ).add()
            Car( manufacturer = "Holden", make = "Commodore", year = 2009 ).add()

            rtn = self.client.get( "/api/cars/make/" )
            print( rtn.data )
            self.api.store.destroy_all()
