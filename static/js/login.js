$(document).ready(function () {

    hide_loader();

    $('#formLogin').submit(function (event) {
        event.preventDefault()

        let datas = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        }

        /*
        # =================================================================================================
        @app.route('/login', methods=['POST'])
        def login_route():
            
            datas = request.get_json()
            res = login(datas['email'], datas['password'])
            session['login_token'] = res['login_token']
            return jsonify(res)
        */
        $.ajax({
            url: `${api_url}/log_in_out`,
            type: 'POST',
            contentType: 'application/json',
            headers: { 'X-Access-Key': api_key },
            data: JSON.stringify(datas),
            success: function(response) {
                if (response.status === 'success') {
                    localStorage.setItem('current_user', response.user.id)
                    localStorage.setItem('login_token', response.login_token.token)
                    api_url_headers = { 'X-Access-Key': api_key, 'Login-Token': response.login_token.token }
                    LoadLoginDasboard('dashboard')
                } else {
                    message('error', 'Erro!', response.msg).modal('show');
                }
            },
            error: function(xhr, status, error) {
                server_error(status, error, xhr.responseText);
            }
        });

    })

})