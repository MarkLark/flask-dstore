from flask import Flask, render_template
from .models import models
from flask_dstore import API
from dstore import MemoryStore


def create_app( name = __name__, config = "tests.configs.unit_tests", store = MemoryStore ):
    app = Flask( name )
    app.config.from_object( config )
    api = API( store( models ), app )

    return app, api
