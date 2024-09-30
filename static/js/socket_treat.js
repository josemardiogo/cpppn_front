var socket = io.connect(api_url)

// connect to socket
socket.on('connect', function () {
    console.log('Connected to the server')
    login_token = localStorage.getItem('login_token')
    current_user = localStorage.getItem('current_user')
    
    socket.emit('login_token_send', { token: login_token }, (ack) => {
        if (ack && ack.status === 'success') {
            console.log('token sended')
        } else {
            alert('Falha ao enviar o token.');
        }
    });
})

socket.on('disconnect', function () {
    console.log('Disconnected to the server')
})