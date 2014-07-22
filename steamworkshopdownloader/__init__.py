from flask import Flask

app = Flask(__name__)

app.config.from_object('steamworkshopdownloader.settings')

app.url_map.strict_slashes = False

import steamworkshopdownloader.core
import steamworkshopdownloader.models
import steamworkshopdownloader.controllers