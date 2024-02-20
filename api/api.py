import time
from flask import Flask
import pathlib
import textwrap
import os

import google.generativeai as genai

app = Flask(__name__)
GOOGLE_API_KEY=os.environ['GOOGLE_API_KEY']
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro') 

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/chat')
def get_chat_response():
    response = model.generate_content("What is the meaning of life?")
    return to_markdown(response.text) 
