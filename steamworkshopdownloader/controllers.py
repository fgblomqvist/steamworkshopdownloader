from flask import render_template
from steamworkshopdownloader import app


# routing for basic pages (pass routing onto the Angular app)
from steamworkshopdownloader.api import SteamWorkshop
from steamworkshopdownloader.core import api


@app.route('/')
@app.route('/view/<wid>')
def basic_pages(**kwargs):
    return render_template('index.html')


api.add_resource(SteamWorkshop, '/api/workshop/<int:wid>')