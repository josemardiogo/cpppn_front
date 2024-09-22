import requests, json


API_URL = 'http://127.0.0.1:5006'
API_POST_HEADERS = {"Content-Type": "application/json", 'X-Access-Key': 'ery4we5633y5iu43b534358d7foueroj58934ipqrie;r457rfd!2w323'}


def login(email, password):
    datas = {'request': '', 'email': email, 'password': password}
    response = requests.post(API_URL + f'/log_in_out', data=json.dumps(datas), headers=API_POST_HEADERS)
    if response.status_code != 200:
        return {'status': 'error', 'msg': 'Server Error'}
    else:
        res = response.json()
        return res