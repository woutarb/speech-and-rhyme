########  imports  ##########
from flask import Flask, jsonify, request, render_template, url_for, session, redirect, url_for, escape, request
app = Flask(__name__)

import rijmwoord

######## Data fetch ############
@app.route('/')
def home_page():
    userinput=request.form.get('fWord')
    if userinput:
        userinputString = userinput.split()
        if len(userinputString) > 1:
            rijm_embed=rijmwoord.rijmwoorden(userinputString[-1])
            return render_template('index.html', embed=rijm_embed)
        else:
            rijm_embed=rijmwoord.rijmwoorden(userinputString[-1])
            return render_template('index.html', embed=rijm_embed)
    else:
        return render_template('index.html', embed='error')


@app.route('/secondPage', methods=['POST'])
def rijm():
    userinput=request.form.get('fWord')
    if userinput:
        userinputString = userinput.split()
        if len(userinputString) > 1:
            rijm_embed=rijmwoord.rijmwoorden(userinputString[-1])
            return render_template('index.html', embed=rijm_embed)
        else:
            rijm_embed=rijmwoord.rijmwoorden(userinputString[-1])
            return render_template('index.html', embed=rijm_embed)
    else:
        return render_template('index.html', embed='error')


#############################
#########  run app  #########
if __name__ == '__main__':
    app.run()