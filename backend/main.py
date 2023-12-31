from flask import Flask
import platform

app = Flask(__name__)

# Enable CORS
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# Root endpoint
@app.route('/')
def hello_world():
    return 'Hello, World!'

# GET method to retrieve Python version
@app.route('/python-version')
def get_python_version():
    return platform.python_version()

if __name__ == '__main__':
    app.run(host="0.0.0.0")
