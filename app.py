from flask import Flask, send_from_directory, request, jsonify, render_template
import os

app = Flask(__name__, static_folder='dist/static', template_folder='dist')
app.template_folder = "templates"

results = []  # store submissions in memory

# Serve React
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join("dist", path)):
        return send_from_directory("dist", path)
    else:
        return send_from_directory("dist", 'index.html')

# Survey form
@app.route('/survey', methods=['GET'])
def survey():
    return render_template("survey.html")

# Handle submission
@app.route('/survey', methods=['POST'])
def survey_post():
    data = dict(request.form)  # grab all fields at once
    results.append(data)
    return "<h3>thanks for hitting the submit button ... tbh i dont care .. ggzzz</h3>"

# Raw JSON output
@app.route('/result', methods=['GET'])
def result():
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

