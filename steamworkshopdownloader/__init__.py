from flask import Flask
from flaskext.versioned import Versioned
from steamworkshopdownloader.versioned_drivers import HashMapDriver


app = Flask(__name__)
versioned = Versioned(app, driver_cls=HashMapDriver,
                      hashmap_path='static/cachebusters.json',
                      path_format='%(path)s?%(version)s')

app.config.from_object('steamworkshopdownloader.settings')
app.url_map.strict_slashes = False

import steamworkshopdownloader.core
import steamworkshopdownloader.api
import steamworkshopdownloader.controllers