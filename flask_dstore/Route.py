from flask import request, current_app
from dstore import Model
from dstore.Error import ValidationError, InstanceNotFound
from dstore_acl import AccessDenied


class Route( object ):
    def __init__( self, api, model ):
        if not issubclass( model, Model ): raise RuntimeError( "Must provide dstore.Model to the Route" )
        self.api       = api
        self.model     = model
        self.rule_name = model._namespace.replace( ".", "_" )
        self.url       = "%s/%s/" % ( self.api.url_prefix, model._namespace.replace( ".", "/" ) )

        self.register()

    def register( self ):
        self.api.blueprint.add_url_rule(
            self.url,
            self.rule_name,
            self.dispatch_model,
            methods = [ "GET", "POST" ]
        )

        self.api.blueprint.add_url_rule(
            self.url + "<row_id>",
            self.rule_name + "_row",
            self.dispatch_instance,
            methods = [ "GET", "POST", "PATCH", "DELETE" ]
        )

    def dispatch_model( self ):
        if   request.method == "GET" : rtn, code = self._process_request( self.read_all )
        elif request.method == "POST": rtn, code = self._process_request( self.add )
        else:
            rtn = { "code": 405, "message": "Method %s %s not allowed" % ( request.method, request.path ) }
            code = 405

        response = Route.jsonify(rtn)
        response.status_code = code
        return response

    def dispatch_instance( self, row_id ):
        try:
            row_id = int( row_id )
        except ValueError as e:
            return { "code": 400, "message": "Invalid ID type supplied. Error: %s" % str( e ) }, 400

        if   request.method == "GET"   : rtn, code = self._process_request( self.read,   row_id )
        elif request.method == "PATCH" : rtn, code = self._process_request( self.update, row_id )
        elif request.method == "DELETE": rtn, code = self._process_request( self.delete, row_id )
        else:
            rtn = {"code": 405, "message": "Method %s %s not allowed" % (request.method, request.path)}
            code = 405

        response = Route.jsonify(rtn)
        response.status_code = code
        return response

    def _process_request( self, func, *args, **kwargs ):
        try:
            return func(*args, **kwargs)
        except ValidationError as e:
            return { "code": 400, "type": "ValidationError", "message": str( e )}, 400
        except AccessDenied as e:
            return { "code": 403, "type": "AccessDenied", "message": str( e )}, 403
        except InstanceNotFound as e:
            return { "code": 404, "type": "InstanceNotFound", "message": str( e )}, 404

    def from_json( self, instance = None ):
        json = request.get_json()
        if instance is None: instance = self.model()
        for var in self.model._vars:
            if var.name not in json: continue
            instance.__dict__[ var.name ] = json[ var.name ]
        return instance

    def add( self ):
        instance = self.from_json()
        instance.add()
        return instance.to_dict(), 200

    def read( self, row_id ):
        return self.model.get( row_id ).to_dict(), 200

    def read_all( self ):
        json = request.get_json()
        if json is None: return self.model.all( to_dict = True ), 200
        else           : return self.model.filter( to_dict = True, **json ), 200

    def update( self, row_id ):
        instance = self.model.get( row_id )
        self.from_json( instance )

        instance.update()
        return instance.to_dict(), 200

    def delete( self, row_id ):
        self.model.get( row_id ).delete()
        return {}, 200

    @staticmethod
    def jsonify( *args, **kwargs ):
        """
        A direct copy of flask.json.jsonify from Flask v0.12

        This is because Flask<=0.10 did not allow serializing top-level arrays.
        Using this method still allows us to use Flask configs to control jsonify.
        """
        from flask.json import dumps
        indent = None
        separators = (',', ':')

        if current_app.config['JSONIFY_PRETTYPRINT_REGULAR'] and not request.is_xhr:
            indent = 2
            separators = (', ', ': ')

        if args and kwargs:
            raise TypeError('jsonify() behavior undefined when passed both args and kwargs')
        elif len(args) == 1:  # single args are passed directly to dumps()
            data = args[0]
        else:
            data = args or kwargs

        return current_app.response_class(
            (dumps(data, indent=indent, separators=separators), '\n'),
            mimetype=current_app.config['JSONIFY_MIMETYPE']
        )
