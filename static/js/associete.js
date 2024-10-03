

$(document).ready(function () {
    // load modals
    if ($('.modals').find(`.associates-modals`).length == 0) {
        $('.modals').append(`
            <div class="associates-modals">
                ${$('.this-modals').html()}
            </div>
        `)
    }
    // remove div this modals for no code repeat
    $('.this-modals').remove()

    // get associates
    users_get('associate')

    socket.on('put_associate', function (datas) {
        // clear list if no associates
        if ($('.parent-div').find('.no-results-message').length != -1)
            $('.parent-div').empty()
        add_associate(datas.user, true)
    })

    socket.on('delete_associate', function (datas) {
        // remove user from list
        $(`.view_item#${datas.id}`).remove()
    })

    // save new associate
    $('#formSaveUser').submit(function (event) {
        event.preventDefault()

        let name = $('#inputUserName').val()
        let nif = $('#inputUserNif').val()
        let phone_number = $('#inputUserPhonenumber').val()
        let email = $('#inputUserEmail').val()
        let rank = $('#inputUserRank').val()
        let id = $('.ModalUser').attr('user_id')

        if (rank == -1) {
            alert("Selecione a patente")
            return
        }

        let datas = {
            name: name,
            nif: nif,
            phone_number: phone_number,
            email: email,
            type: 'associate',
            rank: rank,
            id: id
        }

        if (!id) {
            $.ajax({
                url: `${api_url}/user`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(datas),
                headers: api_url_headers,
                success: function (response) {
                    if (response.status === 'success') {
                        // add_associate(response.user)
                        message('success', 'Sucesso', 'Associado registado com sucesso.', false, null, '.ModalUser').modal('show')
                        // clean form for new save
                        cleanFormUser()
                    } else { message('error', 'Erro!', response.msg, true, '.ModalUser', '.ModalUser').modal('show') }
                },
                error: function (xhr, status, error) {
                    message('error', `Erro (${status})`, `${xhr.responseText}`, false, null, '.ModalUser').modal('show')
                }
            });
        } else {

            $.ajax({
                url: `${api_url}/user`,
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify(datas),
                headers: api_url_headers,
                success: function (response) {
                    if (response.status === 'success') {
                        //add_associate(response.user)
                        $(`.view_item#${id}`).remove()
                        add_associate(response.user, true)
                        message('success', 'Sucesso', 'Informações do associado atualizados com sucesso.', false, null, '.ModalUser').modal('show')
                        // clean form for new save
                        cleanFormUser()
                    } else {
                        message('error', 'Erro!', response.msg, false, null, '.ModalUser').modal('show');
                    }
                },
                error: function (xhr, status, error) {
                    message('error', 'Erro!', xhr.responseText, false, null, '.ModalUser').modal('show');
                }
            });
        }


    })

    $('.parent-div').on('click', '.view_item', function () {

        let user_id = $(this).attr('id')
        $('.associado').text('Dados do Associado')
        // hide buttn save
        get_user(user_id);

    })

    $('#button-new-tran').click(function () {
        cleanFormUser()
        $('.formSaveUserFieldset').removeAttr('disabled')
        $('#btnSaveUser').removeClass('d-none')

        $('.ModalUser')
            .removeAttr('user_id')
            .modal('show')

        $('.associado').text('Novo Associado')
    })


    $('.parent-div').on('click', '.action_delete', function (event) {
        event.stopPropagation()

        $('#ModalMessage').attr('action_value', $(this).closest('.view_item').attr('id'))

        message('info', 'Eliminar utilizador', 'Tem a certeza que deseja eliminar os dados do utilizador?',
            false, null, null, 'Não', 'Sim', 'delete_user').modal('show')
    })

    $('.parent-div').on('click', '.action_edit', function (event) {
        event.stopPropagation()
        let id = $(this).closest('.view_item').attr('id')
        $('.ModalUser').attr('user_id', id);
        $('.associado').text('Editar Associado')

        get_user(id)

        $('#btnSaveUser').removeClass('d-none')
        $('.formSaveUserFieldset').removeAttr('disabled')
    })

    $('#ModalMessageButtonOk').click(function () {
        if ($(this).attr('action') == 'delete_user') {
            let id = $('#ModalMessage').attr('action_value');
            $.ajax({
                url: `${api_url}/user`,
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ id: id }),
                headers: api_url_headers,
                success: function (response) {
                    if (response.status === 'success') {
                        message('success', 'Sucesso', 'Associado Eliminado com sucesso.', false, null, '.ModalUser').modal('show')
                    } else {
                        message('error ao Eliminar Associado', 'Erro!', response.msg).modal('show');
                    }
                },
                error: function (xhr, status, error) {
                    server_error(status, error, xhr.responseText);
                }
            });
        }
    })

    $('#btn-refresh').click(function () {
        // show loader
        loading_effect()
        users_get('associate')
    })

    // inter
    $('.parent-div').on('mouseenter', '.view_item', function () {
        $(this).find('.actions').removeClass('d-none')
    })

    $('.parent-div').on('mouseleave', '.view_item', function () {
        $(this).find('.actions').addClass('d-none')
    })

})

function get_user(id) {
    if (get_loading) {
        console.log('get false')
        return
    }
    start_view_item_loader(id)
    $.ajax({
        url: `${api_url}/user?id=${id}`,
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({ id: id }),
        headers: api_url_headers,
        success: function (response) {
            if (response.status === 'success') {
                let user = response.user
                $('#inputUserName').val(user.name)
                $('#inputUserNif').val(user.nif)
                $('#inputUserPhonenumber').val(user.phone_number)
                $('#inputUserEmail').val(user.email)
                $('#inputUserRank').val(user.rank)
                $('.ModalUser').modal('show');
            } else { message('error', 'Erro!', response.msg).modal('show'); }
            stop_view_item_loader()
        },
        error: function (xhr, status, error) {
            stop_view_item_loader()
            server_error(status, error, xhr.responseText);
        }
    });
    // hide buttn save
    $('#btnSaveUser').addClass('d-none')
    $('.formSaveUserFieldset').attr('disabled', true)
}


function users_get(group) {
    $.ajax({
        url: `${api_url}/user`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ group: group }),
        headers: api_url_headers,
        success: function (response) {
            if (response.status === 'success') {
                $('.parent-div').empty()
                $.each(response.users, function (index, user) { add_associate(user) })
                // verify companies list lengh
                if (response.users.length == 0) {
                    $('.parent-div').html(`<div class="no-results-message"><h4>Nenhum associado encontrado.</h4></div>`)
                }
            } else { message('error', 'Erro!', response.msg).modal('show') }
        },
        error: function (xhr, status, error) { server_error(status, error, xhr.responseText) }
    });
}


function cleanFormUser() {
    $('#inputUserName').val('')
    $('#inputUserNif').val('')
    $('#inputUserPhonenumber').val('')
    $('#inputUserEmail').val('')
    $('#inputUserRank').val('-1')
}

function add_associate(associate, prepend = false) {
    var new_div =
        `<div class="container-fluid">
            <div class="row">
                <div class="view_item col new d-flex align-items-center overflow-hidden m-0 p-0" id="${associate.id}">
                    
                    <div class="icon mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="white"
                            class="bi bi-house d-block mx-auto bg-secondary rounded-circle"
                            viewBox="-2 0 20 16">
                             <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                    </div>

                    <div class="info">
                        <div>

                            <div>

                                <div class="text-truncate fw-bold company-name">
                                    ${associate.name}
                                </div>

                            </div>

                            <div class="block">

                                <div class="text-truncate company-email">
                                    ${associate.email}
                                </div>

                            </div>

                            <div class="block2">

                                <div class="text-truncate company-email">
                                    {ranks.find(option => option.value == associate.rank).label}
                                </div>

                            </div>

                        </div>
                    </div>

                    <div class="actions container px-4 d-none">

                        <div class="rounded-circle action_delete" title="Eliminar" company_id="${associate.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-textarea-resizebi d-block" viewBox="0 0 16 16">
                                    <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </div>

                        <div class="rounded-circle action_edit" title="Editar" company_id="${associate.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-textarea-resizebi d-block" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>
                        </div>

                    </div>

                </div>
            </div>
        </div>`;

    if (prepend)
        $('.list-associetes').prepend(new_div)
    else
        $('.list-associetes').append(new_div)
}