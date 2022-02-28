########  imports  ##########
from flask import Flask, jsonify, request, render_template, url_for, session, redirect, url_for, escape, request
app = Flask(__name__)

import rijmwoord

######## Data fetch ############
@app.route('/')
def home_page():
    userinput ="voorbeeld"
    example_embed=rijmwoord.rijmwoorden(userinput)
    return render_template('index.html', embed=example_embed)


@app.route('/secondPage', methods=['POST'])
def checkRijm():
    userinput=request.form.get('fWord')
    if userinput:
        rijm_embed=rijmwoord.rijmwoorden(userinput)
        return render_template('index.html', embed=rijm_embed)
    else:
        userinput ="voorbeeld"
        example_embed=rijmwoord.rijmwoorden(userinput)
        return render_template('index.html', embed=example_embed)

#############################
#########  run app  #########
app.run(debug=True)