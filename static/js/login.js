$(document).ready(function () {

    hide_loader();

    $('#formLogin').submit(function (event) {
        event.preventDefault()

        let datas = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        }

        $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datas),
            success: function(response) {
                if (response.status === 'success') {
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