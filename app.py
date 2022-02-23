########  imports  ##########
from flask import Flask, jsonify, request, render_template, url_for
app = Flask(__name__)

import rijmwoord

######## Data fetch ############
@app.route('/')
def home_page():
    userinput ="grappig"
    example_embed=rijmwoord.rijmwoorden(userinput)
    return render_template('index.html', embed=example_embed)

@app.route('/do_something', methods=["POST", "GET"])
def do_something():
    userinput ="bloed"
    example_embed=rijmwoord.rijmwoorden(userinput)
    return render_template('index.html', embed=example_embed)
    
with app.test_request_context():
    print (url_for('do_something', next='/'))
#############################
#########  run app  #########
app.run(debug=True)

