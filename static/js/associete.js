
$(document).ready(function () {
    // $.each(users, function (index, associate) {

    //     if (associate.tipo == 'beneficiario') {
    //         add_associate(associate)
    //     }
    // })

    // inter
    $('.parent-div').on('mouseenter', '.view_item', function () {
        $(this).find('.actions').removeClass('d-none')
    })

    $('.parent-div').on('mouseleave', '.view_item', function () {
        $(this).find('.actions').addClass('d-none')
    })

    // save new associate
    $('#formSaveUser').submit(function (event) {
        event.preventDefault()
        let name = $('#inputUserName').val()
        let nif = $('#inputUserNif').val()
        let phone_number = $('#inputUserPhonenumber').val()
        let email = $('#inputUserEmail').val()

        

        message('success', 'Sucesso', 'Associado registado com sucesso.', false, null, '#ModalUser').modal('show')

        add_associate(new_user)

        // clean form for new save
        cleanFormUser()
    })



    $('.parent-div').on('click', '.view_item', function () {

        let user_id = $(this).attr('id')
        get_user(user_id)

    })

    $('#button-new-tran').click(function () {
        cleanFormUser()
        $('.formSaveUserFieldset').removeAttr('disabled')
        $('#btnSaveUser').removeClass('d-none')
        $('#ModalUser').modal('show')
    })


    $('.parent-div').on('click', '.action_delete', function (event) {
        event.stopPropagation()

        $('#ModalMessage').attr('action_value', $(this).closest('.view_item').attr('id'))

        message('info', 'Eliminar utilizador', 'Tem a certeza que deseja eliminar os dados do utilizador?',
            false, null, null, 'Não', 'Sim', 'delete_user').modal('show')
    })

    $('#ModalMessageButtonOk').click(function () {
        if($(this).attr('action') == 'delete_user') {
            let id = $('#ModalMessage').attr('action_value')
            users = delete_user(id)
            // remove user from list
            $(`.view_item#${id}`).remove()
            message('success', 'Sucesso', 'Utilizador eliminado com sucesso.').modal('show')
        }
    })

})

function get_user(id) {
    let user = users.find(user => user.id == id);
    $('#inputUserName').val(user.nome)
    $('#inputUserNif').val(user.nif)
    $('#inputUserPhonenumber').val(user.phone_number)
    $('#inputUserEmail').val(user.email)
    // hide buttn save
    $('#btnSaveUser').addClass('d-none')
    $('.formSaveUserFieldset').attr('disabled', true)
    $('#ModalUser').attr('user_id', user.id).modal('show')
}

function cleanFormUser() {
    $('#inputUserName').val('')
    $('#inputUserNif').val('')
    $('#inputUserPhonenumber').val('')
    $('#inputUserEmail').val('')
}

function add_associate(associate) {
    var new_div =
        `<div class="container">
            <div class="row">
                <div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 p-0" id="${associate.id}">
                    
                    <div class="icon mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="white"
                            class="bi bi-house d-block mx-auto bg-success rounded-circle"
                            viewBox="-2 0 20 16">
                             <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                    </div>

                    <div class="info">
                        <div>

                            <div>

                                <div class="text-truncate fw-bold company-name">
                                    ${associate.nome}
                                </div>

                            </div>

                            <div class="block">

                                <div class="text-truncate company-email">
                                    ${associate.email}
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

    $('.list-associetes').prepend(new_div)
}