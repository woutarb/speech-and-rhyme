########  imports  ##########
# flask is needed for the interaction between the scripts and html and the python, it also helps us render the results in the page to use later
from flask import Flask, jsonify, request, render_template, url_for, session, redirect, url_for, escape, request
app = Flask(__name__)

# the rhymewoord API is required to rhyme in Dutch
import rijmwoord

######## Data fetch ############
@app.route('/')
# I am aware this is the same function twice, but I am very much not familiar with Python, and ran out of hours to spend in this file
def home_page():
    userinput=request.form.get('fWord')
    if userinput:
        # if there's any input, the input will be split and the last word will be used
        userinputString = userinput.split()
        if len(userinputString) > 1:
            rijm_embed=rijmwoord.rijmwoorden(userinputString[-1])
            return render_template('index.html', embed=rijm_embed)
        else:
            rijm_embed=rijmwoord.rijmwoorden(userinputString[-1])
            return render_template('index.html', embed=rijm_embed)
    else:
        return render_template('index.html', embed='error')


@app.route('/result', methods=['POST'])
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
# The if is needed for deployment
if __name__ == '__main__':
    app.run()