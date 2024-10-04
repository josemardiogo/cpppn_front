$(document).ready(function () {

    function btn_menu_click() {
        if ($(".dashboard").hasClass('d-show')) {
            $(".dashboard").removeClass('d-show')
            $("#bg-black").hide()
        } else {
            $(".dashboard").addClass('d-show')
            $("#bg-black").show()
        }
    }


    $(".btn-menu").click(function () {
        btn_menu_click()
    })


    $("#bg-black").click(function () {
        $(".dashboard").removeClass('d-show')
        $("#bg-black").hide()
    })


    window_resize()

    window.addEventListener('resize', () => {
        window_resize()
    })

    function window_resize() {
        if (window.innerWidth > 1000) {
            $(".dashboard").addClass('d-show')
        } else {
            $("#bg-black").hide()
            $(".dashboard").removeClass('d-show')
        }
    }

    $(document).click(function (e) {
        if (!$(e.target).closest('#notification-toast').length && !$(e.target).closest('#btn-notification').length) {
            $("#notification-toast").toast('hide')
        }
    })

    if (window.location.pathname != '/') {
        let show = url.split('/').pop()
        load_window(show);
    } else {
        load_window('home');
    }

    $('.btn-log-out').click(function () {
        $.ajax({
            url: `${api_url}/log_in_out`,
            type: 'DELETE',
            contentType: 'application/json',
            headers: { 'X-Access-Key': 'g6df8f68a@%$^$&$^789dfhgdxzf' },
            data: JSON.stringify({ login_token: login_token }),
            success: function (response) {
                if (response.status === 'success') {
                    localStorage.removeItem('login_token')
                    api_url_headers = { 'X-Access-Key': null, 'Login-Token': null }
                    window.location.href = '/login'
                } else {
                    message('error', 'Erro!', response.msg).modal('show');
                }
            },
            error: function (xhr, status, error) {
                server_error(status, error, xhr.responseText);
            }
        });
    })

})

function load_window(show) {
    let show_label = findLabelByShow(menuItems, show)
    let show_route = show_label[0];
    let label = show_label[1];
    $('.link').text(`/ ${label}`);
    history.pushState(null, '', `/${show_route}`)
    $('.show-content').load(`/render_template/${show_route}`, function (response, status, xhr) {
        if (status == 'success') {
        } else {
            alert('404')
        }
        // setTimeout(function () {
        hide_loader()
        // }, 100)
    })
}