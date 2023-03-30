from flask import request, Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def hello():
	file_ = open('data.json', 'w')
	file_.write(json.dumps(request.get_json()))
	file_.close()
	print(request.get_json())
	return "Hello"

if __name__ == '__main__':
	app.run(debug=True)

