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

    $('.li-nav-header').click(function () {
        $(this).toggleClass('active')
        let li_nav = $(this).parent()
        li_nav.toggleClass('show')
        let li_items = li_nav.find('.ul-ul-nav').find('.li-li-nav').length
        if (li_nav.hasClass('show')) {
            li_nav.css({
                height: (li_items + 1) * 45
            })
        } else {
            li_nav.css({
                height: 45
            })
        }
        const chevronIcon = $(this).find('.bi-chevron-left');
        chevronIcon.toggleClass('right-icon left-icon-volatr');
    })

    $('.li-li-nav').click(function () {

        $('.li-li-nav').removeClass('active')
        $(this).addClass('active')
        
        let show = $(this).attr('show')
        if ($(this).hasClass('users')) {
            group_show = show
            show = 'users'
        }

        let pt_shows = $(this).find('.label').text()

        $('.link').text(`/ ${pt_shows}`);

        if (show) {
            show_loader()
            load_window(show);
        }
    })

    if (url.includes('/dashboard/')) {
        let route = url.split('/dashboard/').pop()
        load_window(route);
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
            success: function(response) {
                if (response.status === 'success') {
                    localStorage.removeItem('login_token')
                    api_url_headers = { 'X-Access-Key': null, 'Login-Token': null }
                    LoadLoginDasboard('login')
                } else {
                    message('error', 'Erro!', response.msg).modal('show');
                }
            },
            error: function(xhr, status, error) {
                server_error(status, error, xhr.responseText);
            }
        });
    })

})

function load_window(show) {

    $('.show-content').load(`/render_template/${show}`, function (response, status, xhr) {
        if (status == 'success') {
            history.pushState(null, '', `/dashboard/${show}`)
        } else {
            alert('404')
        }
        hide_loader()
    })
}