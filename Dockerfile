FROM python:3.7
MAINTAINER Fredrik Blomqvist <fredrik.blomqvist.95@gmail.com>

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update
RUN apt-get install -y nginx supervisor nodejs npm

# Add the code
RUN mkdir /code
COPY steamworkshopdownloader /code/steamworkshopdownloader
COPY less /code/less
COPY javascript /code/javascript
COPY requirements.txt /code/requirements.txt
COPY package.json /code/package.json
COPY Gruntfile.js /code/Gruntfile.js
COPY docker/gunicorn.py /code/gunicorn.py

# Add the tests
COPY tests /code/tests

RUN npm install grunt
RUN npm install -g grunt-cli
RUN pip install gunicorn
RUN pip install -r /code/requirements.txt

WORKDIR /code
RUN npm install

# Generate the static files
RUN grunt production

WORKDIR /

# Setup nginx
RUN rm /etc/nginx/sites-enabled/default
COPY docker/flask.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/flask.conf /etc/nginx/sites-enabled/flask.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Setup supervisord
RUN mkdir -p /var/log/supervisor
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/gunicorn.conf /etc/supervisor/conf.d/gunicorn.conf

EXPOSE 80

# Start processes
CMD ["/usr/bin/supervisord"]
