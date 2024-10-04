let url = window.location.href
// let api_url = 'http://cpppn-api.mtapp.ao'
// let api_url = 'http://127.0.0.1:5006'
let api_url = 'http://192.168.137.170:5006'
let api_key
let api_url_headers
let login_token
let group_show
let templates_loaded = {}


let storedToken = localStorage.getItem('login_token');
if (storedToken) {
    api_url_headers = { 'X-Access-Key': localStorage.getItem('api_key'), 'Login-Token': storedToken };
    console.log('Token retrieved:', storedToken);
} else {
    console.log('No token found in localStorage.');
    window.location.href = '/login'
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
    if (hide != null) {
        $(hide).modal('hide')
    }
    if (back) {
        $('#ModalMessageButtonBackTop')
            .removeClass('d-none')
            .attr('data-bs-dismiss', 'modal')
            .attr('data-bs-toggle', 'modal')
            .attr('data-bs-target', to)
        $('#ModalMessageButtonOk')
            .removeAttr('data-bs-toggle')
            .removeAttr('data-bs-target')
            .attr('data-bs-dismiss', 'modal')
    }
    if (ok_action == null) {
        $('#ModalMessageButtonOk')
            .attr('data-bs-dismiss', 'modal')
            .removeAttr('action')
    } else {
        $('#ModalMessageButtonBack').removeClass('d-none')
        $('#ModalMessageButtonOk')
            .removeAttr('data-bs-dismiss')
            .attr('action', ok_action)
    }
    $('#ModalMessageButtonBack').text(back_text ? back_text : 'Cancelar')
    $('#ModalMessageButtonOk')
        .text(ok_text ? ok_text : 'Ok')
        .removeClass('d-none')

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


function server_error(status, error, xhr_responseText) {
    console.error('Error:', status, error);
    message('error', `Erro com o servidor (${status})`, `${xhr_responseText}`).modal('show')
}


let view_item_icon
let view_item_svg
let get_loading = false

function start_view_item_loader(id = null, attr_name = null, attr_value = null, spinner_size = 48) {
    // active load
    $(document).ready(function () {
        if (id) {
            let view_item = $(`.view_item#${id}`)
            view_item_icon = view_item.find('.icon')
            if (view_item_icon.length == 0)
                return
            // verify if view item is for low window notif
            if (view_item.hasClass('notif-item') && view_item.closest('.notifs-list').length != 0) {
                spinner_size = 30
            }
        }
        else if (attr_name && attr_value) {
            view_item_icon = $(`.view_item[${attr_name}="${attr_value}"]`).find('.icon')
        }
        // get bg class
        let bgClass = view_item_icon.find('.rounded-circle').attr('class').split(' ').filter(c => c.startsWith('bg-'))[0];

        let view_item_loader = `
            <div class="d-flex justify-content-center align-items-center" style="width: ${spinner_size}px; height: ${spinner_size}px;">
                <div class="${bgClass} p-1 rounded-circle d-flex justify-content-center align-items-center" style="width:  ${spinner_size}px; height:  ${spinner_size}px;">
                    <div class="spinner-border text-light" role="status" style="width: ${spinner_size - 16}px; height: ${spinner_size - 16}px;">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>`
        // return if is loading
        if (view_item_icon.html() == view_item_loader)
            return
        view_item_svg = view_item_icon.html()
        view_item_icon.html(view_item_loader)
        get_loading = true
    });
}


function stop_view_item_loader() {
    view_item_icon.html(view_item_svg)
    get_loading = false
}

let save_btn
let save_btn_html
let save_loading = false

function save_loader_start(parent_selector) {
    save_btn = $(parent_selector).find('.save')
    save_btn_html = save_btn.html()
    save_btn.html(`
        <div class="d-flex justify-content-center align-items-center" style="width: ${spinner_size}px; height: ${spinner_size}px;">
            <div class="${bgClass} p-1 rounded-circle d-flex justify-content-center align-items-center" style="width:  ${spinner_size}px; height:  ${spinner_size}px;">
                <div class="spinner-border text-light" role="status" style="width: ${spinner_size - 16}px; height: ${spinner_size - 16}px;">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>`)
    save_loading = true
}

function save_loader_stop() {
    save_btn.html(save_btn_html)
    save_loading = false
}