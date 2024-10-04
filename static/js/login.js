// let api_url = 'http://cpppn-api.mtapp.ao'
// let api_url = 'http://127.0.0.1:5006'
let api_url = 'http://192.168.137.170:5006'

let storedToken = localStorage.getItem('login_token');
if (storedToken) {
    window.location.href = '/'
}

$(document).ready(function () {
    
    setTimeout(function () {
        $('#spinnerContainer').hide();
        $('#overlay').hide();
    }, 200)

    $('#formLogin').submit(function (event) {
        event.preventDefault()

        let datas = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        }
        
        $.ajax({
            url: `${api_url}/log_in_out`,
            type: 'POST',
            contentType: 'application/json',
            headers: { 'X-Access-Key': 'g6df8f68a@%$^$&$^789dfhgdxzf' },
            data: JSON.stringify(datas),
            success: function (response) {
                if (response.status === 'success') {
                    localStorage.setItem('login_token', response.login_token.token)
                    api_key = response.api_key
                    localStorage.setItem('api_key', api_key)

                    api_url_headers = { 'X-Access-Key': api_key, 'Login-Token': response.login_token.token }
                    window.location.href = '/'
                } else {
                    message('error', 'Erro!', response.msg).modal('show');
                }
            },
            error: function (xhr, status, error) {
                let response = JSON.parse(xhr.responseText)
                if (response.description) {
                    let msg = response.description.msg
                    message('error', `Permissão negada (${status})`, `Não tem permissão suficiente para completar essa acção.<br>${msg}`).modal('show')
                } else {
                    message('error', `Erro com o servidor (${status})`, xhr.responseText).modal('show')
                }
            }
        });

    })

})