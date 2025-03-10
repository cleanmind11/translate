from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
app = Flask(__name__)
CORS(app)

from deep_translator import GoogleTranslator
from flask import render_template
with open('static/lang.json', 'r') as json_file:
    lang_data = json.load(json_file)
@app.route('/translate/', methods=['POST'])
# @cross_origin(origin="*")
def translation():
    data = request.json
    print(data)
    text = data.get('text')
    print(text)
    dest_language = data.get('dest_language')
    print(dest_language)
    translator = GoogleTranslator(source='auto', target=dest_language)
    translation = translator.translate(text)
    return jsonify({'translated_text': translation})
    # target_lang = lang_data[request.form['language']]
    #         # print(target_lang)
    #         translator = GoogleTranslator(source='auto', target=target_lang)
    #         # translator = GoogleTranslator(source='auto', target=request.form['language'])
    #         translation = translator.translate(request.form['text'])
    #         return jsonify({'translated_text': translation.text})