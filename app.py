########  imports  ##########
from flask import Flask, jsonify, request, render_template
app = Flask(__name__)
#############################
# Additional code goes here #
#############################
#########  run app  #########
app.run(debug=True)