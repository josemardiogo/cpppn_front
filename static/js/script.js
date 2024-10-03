let url = window.location.href
let api_url = 'http://localhost:5006'
// let api_url = 'http://192.168.0.157:5006'
// let api_url = 'http://cpppn-api.mtapp.ao'
let api_key
let api_url_headers

let login_token

let group_show

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