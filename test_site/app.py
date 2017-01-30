from flask import Flask, render_template
from .models import models
from flask_dstore import API
from dstore import MemoryStore


def create_app( name = __name__, config = "tests.configs.unit_tests", store = MemoryStore ):
    app = Flask( name, static_url_path = "", static_folder = "web/app" )
    app.config.from_object( config )
    api = API( store( models ), app )

    app.add_url_rule( "/",     "index", index )
    app.add_url_rule( "/crud", "crud",  crud  )
    return app, api


def index():
    return render_template( "index.html" )


def crud():
    return render_template( "crud.html" )
