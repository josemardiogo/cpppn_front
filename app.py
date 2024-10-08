from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/home')
@app.route('/groups')
@app.route('/users')
def index_route():
    return render_template('index.html')


@app.route('/login')
def login_route():
    return render_template('login.html')


# =================================================================================================
@app.route('/render_template/<name>')
def render_template_route(name):
    return render_template(f'{name}.html')


if __name__ == '__name__':
    app.run(port=5005, debug=True)