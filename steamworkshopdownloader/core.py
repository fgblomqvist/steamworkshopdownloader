from steamworkshopdownloader import app

from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restful import Api

db = SQLAlchemy(app)
api = Api(app)