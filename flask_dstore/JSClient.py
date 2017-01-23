from flask import render_template
from .JSModel import JSModel


class JSClient( object ):
    def __init__( self, api, client_url = "/dstore-client.js", model_url = "/dstore-models.js" ):
        self.api        = api
        self.client_url = client_url
        self.model_url  = model_url
        self.models     = []

    def register_route( self ):
        self.api.blueprint.add_url_rule(
            self.client_url,
            "dstore_client",
            self.render_client
        )

        self.api.blueprint.add_url_rule(
            self.model_url,
            "dstore_models",
            self.render_models
        )

    def render_client( self ):
        return render_template( "dsclient.js", url_prefix = self.api.url_prefix )

    def render_models( self ):
        rtn = ""
        for model in self.models: rtn += str( model )
        return rtn

    def before_register_model( self, event, store, model ):
        self.models.append( JSModel( model ) )
