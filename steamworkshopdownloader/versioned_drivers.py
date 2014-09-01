import json
import os
from flask.ext.versioned import VersionedError


class HashMapDriver():

    def __init__(self, app, hashmap_path='hashmap.json', path_format='%(path)s?%(version)s'):
        self.app = app
        self.path_format = path_format

        if not os.path.isabs(hashmap_path):
            hashmap_path = os.path.join(app.root_path, hashmap_path)

        if not os.path.isfile(hashmap_path):
            raise VersionedError('No such hashmap file: %s' % hashmap_path)

        self.hashmap = json.load(open(hashmap_path))

    def version(self, stream):
        path = stream

        if path.startswith('/'):
            path = path[1:]

        if path in self.hashmap:
            version = self.hashmap[path]
        else:
            version = ''

        return self.path_format % {
            'version': version,
            'path': stream,
        }