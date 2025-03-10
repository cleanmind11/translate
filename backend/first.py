from flask import Flask
import json
app = Flask(__name__)

from flask import request
from deep_translator import GoogleTranslator
from flask import render_template
with open('static/lang.json', 'r') as json_file:
    lang_data = json.load(json_file)
@app.route('/translate/', methods=['POST'])
def translation():
    error = None
    if request.method == 'POST' != None :
        if request.form['text'] and request.form['language']:
            target_lang = lang_data[request.form['language']]
            # print(target_lang)
            translator = GoogleTranslator(source='auto', target=target_lang)
            # translator = GoogleTranslator(source='auto', target=request.form['language'])
            return translator.translate(request.form['text'])
        else :
            error = 'Invalid language/text'