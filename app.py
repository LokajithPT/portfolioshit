from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='dist/static', template_folder='dist')

# Serve React
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # If requested file exists in dist folder, serve it
    if path != "" and os.path.exists(os.path.join(app.template_folder, path)):
        return send_from_directory(app.template_folder, path)
    # Otherwise, serve index.html for React routing
    else:
        return send_from_directory(app.template_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

