import os
import requests
from flask_restful import Resource


class SteamWorkshop(Resource):

    url = 'http://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v0001/'

    def get(self, wid):

        payload = {'itemcount': 1, 'publishedfileids[0]': wid, 'key': os.environ['STEAM_API_KEY']}

        try:
            r = requests.post(self.url, data=payload)
        except Exception:
            # something went wrong
            return {'message': "Steam Workshop is acting a little funky right now, try again later..."}, 400

        if r.status_code != 200:
            # invalid response
            return {'message': "Something is not right...hey why are you looking at me, I don't know everything!"}, 400

        data = r.json()

        if 'response' not in data or 'publishedfiledetails' not in data['response']:
            # invalid data
            return {'message': "Here's the deal: Steam gave me garbage when I asked for the download link"}, 400

        data = data['response']['publishedfiledetails'][0]

        if not data['result'] == 1:
            # either no results or something is wrong
            return {'message': 'No item with that ID was found'}, 404

        if not data['title']:
            # not a valid workshop file, maybe a screenshot or other media
            return {'message': 'The ID does not belong to a valid workshop item'}, 400

        if 'file_size' in data and ('file_url' not in data or not data['file_url']):
            # user are not allowed to download this file
            return {'message': 'The game that this item belongs too does not allow '
                               'downloading of its items...BUMMER!'}, 403

        if data['filename'].startswith('steamworkshop/collection/'):
            # this is not a normal item, but a collection of items
            return {'message': 'This is not just one item but a collection of items...'
                               'just download them one at a time, slacker!'}, 400

        # only expose some of the data to prevent api misuse
        response = {
            'title': data['title'],
            'preview_url': data['preview_url'],
            'file_size': data['file_size'],
            'file_url': data['file_url']
        }

        return response