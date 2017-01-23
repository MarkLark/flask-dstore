from .app import create_app


class BaseTest( object ):
    def setup( self ):
        self.app, self.api = create_app()
        self.client        = self.app.test_client()
