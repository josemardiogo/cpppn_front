
$(document).ready(function () {
    $.post('/start', function (response) {
        if (response.status == 'success') {
            let template = 'login'
            if (response.logged) {
                template = 'dashboard'
            }
            LoadLoginDasboard(template);
        } else {
            message('error', 'Erro!', response.msg).modal('show')
        }
    }).fail(function (xhr, status, error) { server_error(status, error, xhr.responseText) });
})


function server_error(status, error, xhr_responseText) {
    console.error('Error:', status, error);
    message('error', `Erro com o servidor (${status})`, `${xhr_responseText}`).modal('show')
}


function LoadLoginDasboard(template_path) {
    $('.body-content').load(`/render_template/${template_path}`, function (response, status, xhr) {

        if (status == 'success') {
            if (url.indexOf("/dashboard/") !== -1) {
                let route = url.split('/dashboard').pop()
                if (template_path == 'dashboard' && (route != '' && route != '/')) {
                    template_path = `${template_path}${route}`
                }
            }
            history.replaceState(null, '', `/${template_path}`)
        } else {
            alert('404')
        }
    })
}

function show_loader() {

    $('#spinnerContainer').show();
    $('#overlay').show();
}

function hide_loader() {

    $('#spinnerContainer').hide();
    $('#overlay').hide();
}

function modal(template_name, selector) {
    let modal = $(`.${template_name}-modals`).find(selector)
    return modal
}


function message(type, title, msg, back = false, to = null, hide = null, back_text = null, ok_text = null, ok_action = null) {
    // verify message type
    if (type == 'error') {
        $('#ModalMessageLabelTitle').removeClass('text-success').addClass('text-danger')
    } else if (type == 'success') {
        $('#ModalMessageLabelTitle').removeClass('text-danger').addClass('text-success')
    } else {
        $('#ModalMessageLabelTitle').removeClass('text-danger').removeClass('text-success')
    }
    // if no message
    if (msg == null || msg == undefined || msg == '')
        msg = 'Erro ao executar a tarefa.'
    $('#ModalMessage').find('.modal-body').html(msg);
    $('#ModalMessageLabelTitle').text(title)
    // configure back button
    $('#ModalMessageButtonBack')
        .attr('data-bs-dismiss', 'modal')
        .removeAttr('data-bs-target')
        .removeAttr('data-bs-toggle')

    $('#ModalMessageButtonBack, #ModalMessageButtonBackTop').addClass('d-none')
    if (hide != null)
        $(hide).modal('hide')
    if (back) {
        $('#ModalMessageButtonBackTop')
            .removeClass('d-none')
            .attr('data-bs-dismiss', 'modal')
            .attr('data-bs-toggle', 'modal')
            .attr('data-bs-target', to)


    } else {
        $('#ModalMessageButtonOk').removeClass('d-none')
    }
    if (ok_action == null) {
        $('#ModalMessageButtonOk').attr('data-bs-dismiss', 'modal').removeAttr('action')
    } else {
        $('#ModalMessageButtonBack').removeClass('d-none')
        $('#ModalMessageButtonOk').removeAttr('data-bs-dismiss').attr('action', ok_action).removeClass('d-none')
    }
    $('#ModalMessageButtonBack').text(back_text ? back_text : 'Cancelar')
    $('#ModalMessageButtonOk').text(ok_text ? ok_text : 'Ok')

    return $('#ModalMessage')
}


function loading_effect() {
    $('.parent-div')
        .html(`
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
            <div class="container-fluid"><div class="row"><div class="view_item col new d-flex align-items-center overflow-hidden m-0 rounded-4 animated-background"><div class="icon mr-3"><div class="circle mx-auto rounded-circle"></div></div><div class="info"><div><div><div class="cell"></div></div><div class="block"><div class="cell"></div></div></div></div></div></div></div>
        `)
}