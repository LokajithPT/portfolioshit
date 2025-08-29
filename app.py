from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "<h1>Hello from Loki 🚀</h1><p>This is lokajithkrishnapt.xyz!</p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

