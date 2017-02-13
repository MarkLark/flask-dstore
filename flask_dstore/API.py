from dstore import Store
from flask import Blueprint
from .Route import Route
from flask import _app_ctx_stack as stack


class API( object ):
    def __init__(
            self,
            store,
            app        = None,
            url_prefix = "/api"
    ):
        self.store      = store
        self.blueprint  = None
        self.url_prefix = url_prefix
        self.routes     = []

        if app is not None: self.init_app( app, store )

    def init_app( self, app, store ):
        if not isinstance( store, Store ): raise RuntimeError( "API.store must be an instance of dstore.Store" )
        app.config.setdefault('JSONIFY_MIMETYPE', 'application/json')
        self.store = store
        self.store.set_config( app.config )
        self.store.events.before_init_app += self.before_init_app
        self.store.con_cache = self.get_store_connection

        self.create_blueprint()

        if hasattr(app, 'teardown_appcontext'): app.teardown_appcontext( self.teardown )
        else                                  : app.teardown_request(    self.teardown )

        self.store.init_app()
        app.register_blueprint( self.blueprint )

    def before_init_app( self, event, store ):
        self.store.events.before_register_model += self.before_register_model

    def create_blueprint( self ):
        self.blueprint = Blueprint(
            "flask_dstore",
            __name__
        )

    def teardown( self, error ):
        ctx = stack.top
        con = None
        if ctx is not None:
            if hasattr( ctx, "dstore_connection" ):
                con = ctx.dstore_connection
        else:
            con = self.store._con

        if con is not None: self.store.disconnect()

    def before_register_model( self, event, store, model ):
        self.routes.append( Route( self, model ) )

    def get_store_connection( self, store ):
        ctx = stack.top
        if ctx is not None:
            if not hasattr( ctx, "dstore_connection" ):
                ctx.dstore_connection = store.connect()
            return ctx.dstore_connection

        # This means we are outside the application context
        # So store the connection directly on the Store instance
        if store.con is None: store.con = store.connect()
        return store.con
