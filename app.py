from flask import Flask, jsonify, render_template, request, session
from api import login

app = Flask(__name__)
app.secret_key = '434BHG@.cfre,JK'


@app.route('/')
@app.route('/login')
@app.route('/dashboard')
@app.route('/dashboard/associates')
def index_route():
    return render_template('index.html')


# =================================================================================================
@app.route('/login', methods=['POST'])
def login_route():
    
    datas = request.get_json()
    res = login(datas['email'], datas['password'])
    session['login_token'] = res['login_token']
    return jsonify(res)


# =================================================================================================
@app.route('/start', methods=['POST'])
def start_route():
    return jsonify({
        'status': 'success',
        'logged': True if 'login_token' in session else False
    })


# =================================================================================================
@app.route('/render_template/<name>')
def render_template_route(name):
    return render_template(f'{name}.html')


if __name__ == '__name__':
    app.run(port=5005, debug=True)