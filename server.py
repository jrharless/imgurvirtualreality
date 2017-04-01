from flask import Flask, request
app = Flask(__name__)

@app.route('/', methods=['POST'])
def hello_world():
        command = request.form['command']
        arguments = request.form['arguments']
        if command == "search":
            response = "searching for " + arguments
        else:
            response = "invalid query"
        return response
