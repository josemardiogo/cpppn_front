let users = [
    {
        id: 0,
        'nome': 'Lopes Cristovao',
        'email': 'lopes@gmail.com',
        'phone_number': '91231321',
        'nif': '45435431LA532',
        'senha': '123',
        'tipo': 'beneficiario',
    },
    {
        id: 1,
        'nome': 'Josemar Diogo',
        'email': 'josemardiogo020@gmail.com',
        'phone_number': '91231321',
        'nif': '565323154BE424',
        "senha": "123456",
        'tipo': 'beneficiario',
    },
    {
        id: 2,
        'nome': 'Samuel Hermelindo',
        'email': 'samuelhermelindo@gmail.com',
        'nif': '455643145ME512',
        'phone_number': '91231321',
        'senha': '123456',
        'tipo': 'admin',
    }
];


// var socket = io.connect('http://127.0.0.1:5006/')
// socket.on('connect', function () {
//     console.log('Connected to the server')
// })

// socket.on('disconnect', function () {
//     console.log('Disconnected to the server')
// })

let url = window.location.href