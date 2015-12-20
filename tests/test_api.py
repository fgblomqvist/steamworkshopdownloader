import os
import json
import requests
from nose.tools import assert_equal
from unittest.mock import MagicMock
from steamworkshopdownloader import app as swd
from urllib import parse

# we won't need this since we will be using the mock
os.environ['STEAM_API_KEY'] = ''


def get_stub(*args, **kwargs):
    response = requests.post.return_value
    response.status_code = 200
    with open('tests/sw_api.json', 'r') as f:
        response.json.return_value = json.load(f)
        return response

requests.post = MagicMock(side_effect=get_stub)

app = swd.test_client()


def test_api():

    # get the json
    rv = app.get('/api/workshop/546392647')

    # load it
    data = json.loads(rv.data.decode('UTF-8'))

    assert_equal(data["file_size"] > 0, True)

    # simple verification that it returns a valid url
    def check_steam_url(url):
        result = parse.urlparse(url)
        assert_equal(result.netloc.endswith('steamusercontent.com'), True)

    urls = [data['file_url'], data['preview_url']]

    for u in urls:
        check_steam_url(u)
