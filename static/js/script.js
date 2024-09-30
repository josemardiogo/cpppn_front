let url = window.location.href
let api_url = 'http://127.0.0.1:5006'
// let api_url = 'http://cpppn-api.mtapp.ao'
let api_key = 'ery4we5633y5iu43b534358d7foueroj58934ipqrie;r457rfd!2w323'
let api_url_headers

let current_user
let login_token

let ranks = [
    { "value": 1, "label": "Agente" },
    { "value": 2, "label": "Subchefe" },
    { "value": 3, "label": "Chefe" },
    { "value": 4, "label": "Subinspector" },
    { "value": 5, "label": "Inspector" },
    { "value": 6, "label": "Superintendente" },
    { "value": 7, "label": "Superintendente-Chefe" },
    { "value": 8, "label": "Comissário" },
    { "value": 9, "label": "Comissário-Chefe" },
    { "value": 10, "label": "Comissário-Geral" }
]