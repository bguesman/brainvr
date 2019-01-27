# pip install -U flask-cors
# pip install flask

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from random import uniform
import numpy as np
from stream_test import bandpower

import pandas
import numpy as np
import scipy
from scipy import signal
from matplotlib import pyplot as plt


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
    # band_intensities = np.ndarray.tolist(get_bands())
    # print(band_intensities)
    data = pandas.read_csv("~/Desktop/SavedData/OpenBCI-RAW-EEG_test.txt", header = 6)
    d = data.values
    ch = np.array(d[-100:,1:9], dtype=np.float32)

    it = 0
    Ca = 0
    Ct = 0
    Cd = 0
    Cb = 0

    for i in range(8):
        if (np.std(ch[:,i])) > 0:
            it = it + 1
            Cd = Cd + bandpower(ch[:,i], 250, 0.1, 4)
            Ct = Ct + bandpower(ch[:,i], 250, 4, 8)
            Ca = Ca + bandpower(ch[:,i], 250, 8, 15)
            Cb = Cb + bandpower(ch[:,i], 250, 15, 30)

    if it > 0:
        Ca = Ca/it
        Ct = Ct/it
        Cd = Ca/it
        Cb = Cb/it
    else:
        Ca = 0
        Ct = 0
        Cd = 0
        Cb = 0
    band_intensities = [Ca,Ct,Cd,Cb]
    print(band_intensities)
    return jsonify(band_intensities)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    # start collecting data
    band()
