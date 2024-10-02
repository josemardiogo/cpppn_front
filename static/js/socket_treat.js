var socket = io.connect(api_url)

// connect to socket
socket.on('connect', function () {
    console.log('Connected to the server')
    login_token = localStorage.getItem('login_token')
    api_key = localStorage.getItem('api_key')

    socket.emit('login_token_send', { token: login_token }, (ack) => {
        if (ack && ack.status === 'success') {
            console.log('token sended')
        } else {
            // clear local storage login values
            localStorage.removeItem('login_token')
            message('error', 'Sessão expirada', 'Clica no botão "Nova sessão" para início de uma nova sessão.', false, null, '.modal', null, 'Nova sessão', 'go_to_login').modal('show')
            $('#ModalMessageButtonOk').click(function () {
                if ($(this).attr('action') == 'go_to_login') {
                    $('#ModalMessage').modal('hide')
                    LoadLoginDasboard('login');
                }
            })
        }
    });
})

socket.on('disconnect', function () {
    console.log('Disconnected to the server')
})