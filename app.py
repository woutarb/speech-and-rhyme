########  imports  ##########
from flask import Flask, jsonify, request, render_template, url_for, session, redirect, url_for, escape, request
app = Flask(__name__)

import rijmwoord

######## Data fetch ############
@app.route('/')
def home_page():
    if 'userinput1' in session:
        userinput1 =session[userinput1]
        example_embed=rijmwoord.rijmwoorden(userinput1)
        return render_template('index.html', embed=example_embed)
    userinput ="voorbeeld"
    example_embed=rijmwoord.rijmwoorden(userinput)
    return render_template('index.html', embed=example_embed)


@app.route('/do_something', methods=["POST", "GET"])
def do_something():
    if 'userinput1' in session:
        userinput1 =session[userinput1]
        example_embed=rijmwoord.rijmwoorden(userinput1)
        return render_template('index.html', embed=example_embed)
    userinput1 = request.form.get('fWord')
    userinput2 = request.form.get('sWord')
    print (userinput1)
    example_embed=rijmwoord.rijmwoorden(userinput1)
    return render_template('index.html', embed=example_embed)
    
with app.test_request_context():
    print (url_for('do_something', next='/'))
#############################
#########  run app  #########
app.run(debug=True)




