$(document).ready(function () {

    let btn_menu = $(".btn-menu");
    let aside = $(".dashboard");
    let background = $("#bg-black")

    function btn_menu_click() {
        if (aside.hasClass('d-show')) {
            aside.removeClass('d-show')
            background.hide()
        } else {
            aside.addClass('d-show')
            background.show()
        }
    }

    btn_menu.click(function () {
        btn_menu_click()
    })

    background.click(function () {
        aside.removeClass('d-show')
        background.hide()
    })


    window_resize()

    window.addEventListener('resize', () => {
        window_resize()
    })

    function window_resize() {
        if (window.innerWidth > 1000) {
            aside.addClass('d-show')
        } else {
            background.hide()
            aside.removeClass('d-show')
        }
    }

    $(document).click(function (e) {
        if (!$(e.target).closest('#notification-toast').length && !$(e.target).closest('#btn-notification').length) {
            $("#notification-toast").toast('hide')
        }
    })

    $('.li-nav-header').click(function () {
        $(this).toggleClass('active')
        $(this).parent().toggleClass('show')
        $('.bi-chevron-left').removeClass('left-icon');
        $('.bi-chevron-left').toggleClass('left-icon-volatr');
    })

    $('.li-li-nav').click(function () {

        $('.li-li-nav').removeClass('active')
        $(this).addClass('active')

        let show = $(this).attr('show')

        $('.link').text(show + "/");

        if (show) {
            show_loader()
            load_window(show);
        }
    })

    let route = url.split('/dashboard').pop()
    console.log(route);
    
    if(route == '' || route == '/') {
        load_window('home');
    } else {
        load_window(route);
    }
    

})

function load_window(show) {

    $('.show-content').load(`/render_template/${show}`, function (response, status, xhr) {
        if (status == 'success') {
        } else {
            alert('404')
        }
        hide_loader()
    })
}