$(document).ready(function () {
    // load modals
    if ($('.modals').find(`.permissions-modals`).length == 0) {
        $('.modals').append(`
            <div class="permissions-modals">
                ${$('.this-modals').html()}
            </div>
        `)
    }
    // remove div this modals for no code repeat
    $('.this-modals').remove()

    permission_post()

    function permission_post() {
        $.ajax({
            url: `${api_url}/permission`,
            type: 'POST',
            contentType: 'application/json',
            headers: api_url_headers,
            data: JSON.stringify({ offset: 0 }),
            success: function (response) {
                if (response.status === 'success') {
                    $('.parent-div').empty()
                    $.each(response.datas, function (index, permission) {
                        add_permission(permission)
                    })
                    // verify list lengh
                    if (response.datas.length == 0) {
                        $('.parent-div').html(`<div class="no-results-message"><h4>Nenhuma permissão encontrada.</h4></div>`)
                    }
                } else { message('error', 'Erro!', response.msg).modal('show') }
            },
            error: function (xhr, status, error) {
                message('error', 'Erro!', xhr.responseText, false, null, '.ModalPermition').modal('show');
            }
        });
    }


    function permission_get(id) {
        if (get_loading) {
            return
        }
        start_view_item_loader(id)
        $.ajax({
            url: `${api_url}/permission?id=${id}`,
            type: 'GET',
            contentType: 'application/json',
            headers: api_url_headers,
            success: function (response) {
                if (response.status === 'success') {
                    let permission = response.permission
                    $('#inputName').val(permission.name)
                    $('#inputDescription').val(permission.description)
                    $('.ModalPermition').modal('show');
                } else { message('error', 'Erro!', response.msg).modal('show'); }
                stop_view_item_loader()
            },
            error: function (xhr, status, error) {
                server_error(status, error, xhr.responseText);
                stop_view_item_loader()
            }
        });
        // hide buttn save
        $('#btnSavePermission').addClass('d-none')
        $('.formSaveFieldset').attr('disabled', true)
    }

    $('.parent-div').on('click', '.view_item', function () {
        let id = $(this).attr('id')
        // hide buttn save
        permission_get(id);
    })

})


function add_permission(permission, prepend = false) {
    var new_div =
        `<div class="container-fluid">
            <div class="row">
                <div class="view_item col new d-flex align-items-center overflow-hidden m-0 p-0" id="${permission.id}">
                    
                    <div class="icon mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="white"
                            class="bi bi-house d-block mx-auto bg-secondary rounded-circle"
                            viewBox="-2 0 20 16">
                                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                    </div>

                    <div class="info">
                        <div>

                            <div>
                                <div class="text-truncate fw-bold">
                                    ${permission.name}
                                </div>
                            </div>

                            <div class="block">
                                <div class="text-truncate">
                                    Permitir que o utilizador ${permission.description}
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div class="actions container px-4">

                        <div class="rounded-circle action_delete" title="Eliminar" permission_id="${permission.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-textarea-resizebi d-block" viewBox="0 0 16 16">
                                    <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </div>

                        <div class="rounded-circle action_edit" title="Editar" permission_id="${permission.id}">
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
        $('.list-permission').prepend(new_div)
    else
        $('.list-permission').append(new_div)
}