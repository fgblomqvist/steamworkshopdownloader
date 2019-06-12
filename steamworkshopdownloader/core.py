from steamworkshopdownloader import app

from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

db = SQLAlchemy(app)
api = Api(app)