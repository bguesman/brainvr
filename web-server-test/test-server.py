# pip install -U flask-cors
# pip install flask

from flask import Flask
from flask_cors import CORS, cross_origin
from random import uniform

app = Flask(__name__)

cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def index():
    return 'Hello world'

@app.route('/datarequest')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def datarequest():
    return str(uniform(0, 1))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
