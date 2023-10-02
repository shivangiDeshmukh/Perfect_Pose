# Flask is a way for web servers to pass requests to web applications or frameworks
from flask import Flask, render_template, request, send_file, send_from_directory, jsonify
# from flask_cors import CORS, cross_origin
import pickle
import numpy as np
# Importing the pickle file which has the KNNClassifier
model = pickle.load(open('exercises.pkl', 'rb+'))
# We are creating the Flask instance.
app = Flask(__name__, template_folder='public')
# It allow CORS which stands for Cross Origin Resource Sharing for all domains on all routes. This is useful when you want to
# deploy your website
# cors = CORS(app)
# In order for browsers to allow POST requests with a JSON content type, you must allow the Content-Type header.
# app.config['CORS_HEADERS'] = 'Content-Type'
# Creating a route for the pose detection page


@app.route("/detect", methods=['POST', 'GET'])
# @cross_origin()  # allow all origins all methods.
# Function to predict the exercise of the person
def main():
    if(request.method == 'POST'):
        inputs = [x for x in request.form.values()]
        input_parse = list(inputs)
        inputs_parse_float = [float(x) for x in input_parse]
        result = model.predict([inputs_parse_float])
        print(result[0])
        return result[0]
    if(request.method == 'GET'):
        return render_template('index.html')


# It Allows You to Execute Code When the File Runs as a Script, but Not When It's Imported as a Module
if __name__ == '__main__':
    app.run(debug=True)
