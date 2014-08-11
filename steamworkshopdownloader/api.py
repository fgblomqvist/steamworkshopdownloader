import os
import requests
from flask.ext.restful import Resource


class SteamWorkshop(Resource):

    url = 'http://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v0001/'

    def post(self, wid):

        payload = {'itemcount': 1, 'publishedfileids[0]': wid, 'key': os.environ['STEAM_API_KEY']}

        r = requests.post(self.url, data=payload)
        data = r.json()

        if r.status_code != 200 or 'response' not in data or 'publishedfiledetails' not in data['response']:
            # invalid response
            pass

        data = data['response']['publishedfiledetails'][0]

        if not data['result'] == 1:
            # either no results or something is wrong
            return {'message': 'No entry with that ID was found', 'status_code': 404}, 404

        # only expose some of the data to prevent api misuse
        response = {
            'title': data['title'],
            'preview_url': data['preview_url'],
            'file_size': data['file_size'],
            'file_url': data['file_url']
        }

        return response


