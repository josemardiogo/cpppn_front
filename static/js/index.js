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
                    localStorage.removeItem('api_key')
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
    show_loader()
    let show_label = findLabelByShow(menuItems, show)
    let show_route
    let label
    if (show_label) {
        show_route = show_label[0];
        label = show_label[1];
        // alert(show)
        if (['users'].includes(show_route)) {
            group_show = show
        }
    } else {
        show_route = 'home'
        label = 'Início'
    }
    $('.link').text(`/ ${label}`);
    history.pushState(null, '', `/${show_route}`)
    if (show_route in templates_loaded) {
        // alert('not loaded')
        $('.show-content').html(templates_loaded[show_route])
        hide_loader()
    } else {
        // alert('loaded')
        // $('.show-content').load(`/render_template/${show_route}`, function (response, status, xhr) {
        $('.show-content').load(`/templates/${show_route}.html`, function (response, status, xhr) {
            if (status == 'success') {
                templates_loaded[show_route] = response

            } else {
                alert('404')
            }
            // setTimeout(function () {
            hide_loader()
            // }, 100)
        })
    }
}