from flask import Flask
from random import randint

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello world'

@app.route('/datarequest')
def datarequest():
    return str(randint(0, 9))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
