# pip install -U flask-cors
# pip install flask

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from random import uniform
import numpy as np
from stream_test import band, get_bands


app = Flask(__name__)

cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def index():
    return 'Hello world'

@app.route('/datarequest')
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def datarequest():
    # intensities = [str(uniform(0, 1)) for x in range(0, 6)]
    band_intensities = np.ndarray.tolist(get_bands())
    print(band_intensities)
    return jsonify(band_intensities)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    # start collecting data
    band()
