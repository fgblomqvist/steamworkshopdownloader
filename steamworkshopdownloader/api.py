import os
import requests
from flask.ext.restful import Resource


class SteamWorkshop(Resource):

    url = 'http://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v0001/'

    def get(self, wid):

        payload = {'itemcount': 1, 'publishedfileids[0]': wid, 'key': os.environ['STEAM_API_KEY']}

        r = requests.post(self.url, data=payload)
        data = r.json()

        if r.status_code != 200 or 'response' not in data or 'publishedfiledetails' not in data['response']:
            # invalid response
            return {'message': "Something is not right...hey why are you looking at me, I don't know everything!"}, 400

        data = data['response']['publishedfiledetails'][0]

        if not data['result'] == 1:
            # either no results or something is wrong
            return {'message': 'No entry with that ID was found'}, 404

        if not data['title']:
            # not a valid workshop file, maybe a screenshot or other media
            return {'message': 'The ID does not belong to a valid workshop file'}, 400

        if 'file_size' in data and not 'file_url' in data:
            # user are not allowed to download this file
            return {'message': 'The game that this item belongs too does not allow '
                               'downloading/subscribing of its items...BUMMER!'}, 403

        # only expose some of the data to prevent api misuse
        response = {
            'title': data['title'],
            'preview_url': data['preview_url'],
            'file_size': data['file_size'],
            'file_url': data['file_url']
        }

        return response