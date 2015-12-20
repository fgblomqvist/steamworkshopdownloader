FROM python:3.4
MAINTAINER Fredrik Blomqvist <fredrik.blomqvist.95@gmail.com>

RUN apt-get update
RUN apt-get install -y nginx supervisor

# Add the code
RUN mkdir /code
COPY steamworkshopdownloader /code/steamworkshopdownloader
COPY requirements.txt /code/requirements.txt
COPY docker/newrelic.ini /code/newrelic.ini
COPY docker/gunicorn.py /code/gunicorn.py

# Add the tests
COPY tests /code/tests

RUN pip install gunicorn
RUN pip install -r /code/requirements.txt

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

ENV NEW_RELIC_CONFIG_FILE=/code/newrelic.ini

# Start processes
CMD ["/usr/bin/supervisord"]
