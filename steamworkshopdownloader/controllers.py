from flask import render_template
from steamworkshopdownloader import app


# routing for basic pages (pass routing onto the Angular app)
@app.route('/')
@app.route('/about')
@app.route('/blog')
def basic_pages(**kwargs):
    return render_template('index.html')