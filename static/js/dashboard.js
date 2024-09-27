let template

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

        let pt_shows = { 'associates': ' / Associados', 'home': ' / Início' }

        $('.link').text(pt_shows[show]);

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