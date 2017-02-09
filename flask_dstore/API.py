from dstore import Store
from flask import Blueprint, render_template
from pathlib import Path
from .Route import Route
from .JSClient import JSClient


from flask import _app_ctx_stack as stack

MODULE_PATH = Path(__file__).absolute().parent
VIEW_DIR    = MODULE_PATH / "views"


class API( object ):
    def __init__(
            self,
            store,
            app        = None,
            url_prefix = "/api",
            client_url = "/dstore-client.js",
            model_url  = "/dstore-models.js",
            view_url   = "/dstore-view.js"
    ):
        self.store      = store
        self.blueprint  = None
        self.jsclient   = None
        self.url_prefix = url_prefix
        self.client_url = client_url
        self.model_url  = model_url
        self.view_url   = view_url
        self.routes     = []

        if app is not None: self.init_app( app, store )

    def init_app( self, app, store ):
        if not isinstance( store, Store ): raise RuntimeError( "API.store must be an instance of dstore.Store" )
        app.config.setdefault('JSONIFY_MIMETYPE', 'application/json')
        self.store = store
        self.store.set_config( app.config )
        self.jsclient = JSClient( self, self.client_url, self.model_url )
        self.store.events.before_init_app += self.before_init_app
        self.store.con_cache = self.get_store_connection

        self.create_blueprint()
        self.jsclient.register_route()

        if hasattr(app, 'teardown_appcontext'): app.teardown_appcontext( self.teardown )
        else                                  : app.teardown_request(    self.teardown )

        self.store.init_app()
        app.register_blueprint( self.blueprint )

    def before_init_app( self, event, store ):
        self.store.events.before_register_model += self.before_register_model

    def create_blueprint( self ):
        self.blueprint = Blueprint(
            "flask_dstore",
            __name__,
            template_folder = str( VIEW_DIR )
        )

        self.blueprint.add_url_rule(
            self.view_url,
            "dstore_dsview",
            self.render_dsview
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
        self.jsclient.before_register_model( event, store, model )

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

    def render_dsview( self ):
        return render_template( "dsview.js" )
